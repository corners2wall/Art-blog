import { Suspense, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import {
  Canvas,
  useLoader,
  Object3DNode,
  extend,
  useFrame,
  NodeProps,
  useThree,
} from '@react-three/fiber';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import {
  Box3,
  Group,
  MeshBasicMaterial,
  NoToneMapping,
  Object3DEventMap,
  Vector2,
  Vector3,
} from 'three';
import { Char } from './Char';
import CustomOrbitControl from '../../utils/CustomOrbitControl';

extend({ TextGeometry, CustomOrbitControl });

function CameraRig() {
  const cameraFinishPosition = new Vector3(0, 0, 500);
  const [isCameraAnimationStarted, setIsCameraAnimationStarted] = useState(false);

  useFrame(({ camera }) => {
    if (isCameraAnimationStarted) camera.position.lerp(cameraFinishPosition, 0.1);

    if (Math.round(camera.position.z) === cameraFinishPosition.z)
      setIsCameraAnimationStarted(false);
  });

  useEffect(() => {
    const timerId = setTimeout(() => setIsCameraAnimationStarted(true), 2500);

    return () => clearTimeout(timerId);
  }, []);

  return null;
}

const target = new Vector2();

interface TextProps {
  word: string;
}

function Text({ word }: TextProps) {
  const letters = Array.from(word);
  const font = useLoader(FontLoader, 'font.json');

  const groupRef = useRef<Group<Object3DEventMap>>(null);

  const charMaterials = useMemo(
    () => [
      new MeshBasicMaterial({ colorWrite: false }),
      new MeshBasicMaterial({ color: '#bfea88' }),
    ],
    []
  );

  const [charsWidth, setCharWidth] = useState<number[]>([]);
  const [isRecalculateOffset, setIsRecalculateOffset] = useState(true);

  const addCharWidth = (width: number) => setCharWidth((prevWidth) => prevWidth.concat(width));

  useEffect(() => setIsRecalculateOffset(false), [charsWidth]);

  useEffect(() => {
    if (groupRef.current) {
      groupRef.current.scale.setX(1.25);

      // looks like bicycle
      new Box3()
        .setFromObject(groupRef.current)
        .getCenter(groupRef.current.position)
        .multiplyScalar(-1.25); // magic number
    }
  }, [isRecalculateOffset]);

  const chars = useMemo(
    () =>
      letters.map((char, index) => (
        <Char
          char={char}
          font={font}
          materials={charMaterials}
          index={index}
          offsets={charsWidth}
          mutate={addCharWidth}
          key={index}
        />
      )),
    [isRecalculateOffset]
  );

  return <group ref={groupRef}>{chars}</group>;
}

function OrbitControl() {
  const { camera, gl } = useThree();

  const ref = useRef();

  useFrame((state) => ref.current.update());

  useEffect(() => {
    const onMouseMove = (e) => {
      const x = -0.5 + (1 - e.clientX / gl.domElement.width);
      const y = -0.5 + e.clientY / gl.domElement.height;

      const event = {
        clientX: x * 120,
        clientY: y * 150,
      };

      ref.current.handleMouseMoveRotate(event);
    };

    window.addEventListener('mousemove', onMouseMove);

    return () => window.removeEventListener('mousemove', onMouseMove);
  }, [camera, gl]);

  return (
    <customOrbitControl
      ref={ref}
      args={[camera, gl.domElement]}
      enableDamping
      dampingFactor={0.005}
    />
  );
}

export default function R3F() {
  return (
    <div className='w-screen h-screen'>
      <Canvas
        dpr={[2, 2]}
        gl={{ toneMapping: NoToneMapping }}
        camera={{ position: [-1, 0, 800], fov: 55 }}
      >
        <color attach='background' args={['#192928']} />
        <CameraRig />
        <OrbitControl />
        <Suspense fallback={null}>
          <Text word='SOMEFOLK' />
        </Suspense>
      </Canvas>
    </div>
  );
}
