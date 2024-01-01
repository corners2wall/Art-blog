import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useLoader, extend, useFrame, useThree } from '@react-three/fiber';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { Box3, Group, MeshBasicMaterial, NoToneMapping, Object3DEventMap, Vector3 } from 'three';
import { Char } from './Char';
import CustomOrbitControl from '../../utils/CustomOrbitControl';

extend({ TextGeometry, CustomOrbitControl });

function CameraRig() {
  const endZPosition = 500;
  const [isCameraAnimationStarted, setIsCameraAnimationStarted] = useState(false);

  useFrame(({ camera }) => {
    if (isCameraAnimationStarted) {
      const { x, y } = camera.position;
      camera.position.lerp(new Vector3(x, y, endZPosition), 0.1);
    }

    if (Math.round(camera.position.z) === endZPosition) setIsCameraAnimationStarted(false);
  });

  useEffect(() => {
    const timerId = setTimeout(() => setIsCameraAnimationStarted(true), 2500);

    return () => clearTimeout(timerId);
  }, []);

  return null;
}

interface TextProps {
  word: string;
  setIsModelsLoaded(v: boolean): void;
}

function Text({ word, setIsModelsLoaded }: TextProps) {
  const letters = Array.from(word);
  const font = useLoader(FontLoader, 'fonts/EncodeSans.Typeface.json');

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
    const timerId = setTimeout(() => setIsModelsLoaded(true), 500);

    return () => clearTimeout(timerId);
  }, [isRecalculateOffset]);

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

  useFrame(() => ref.current!.update());

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      const x = -0.5 + (1 - e.clientX / gl.domElement.width);
      const y = -0.5 + e.clientY / gl.domElement.height;

      const event = {
        clientX: x * 30,
        clientY: y * 45,
      };

      ref.current!.handleMouseMoveRotate(event);
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

interface R3FProps {
  setIsModelsLoaded(v: boolean): void;
}

export default function R3F({ setIsModelsLoaded }: R3FProps) {
  return (
    <Canvas gl={{ toneMapping: NoToneMapping }} camera={{ position: [0, 0, 800], fov: 55 }}>
      <CameraRig />
      <OrbitControl />
      <Suspense>
        <Text word='SOMEFOLK' setIsModelsLoaded={setIsModelsLoaded} />
      </Suspense>
    </Canvas>
  );
}
