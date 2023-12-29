import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useLoader, Object3DNode, extend, useFrame, NodeProps } from '@react-three/fiber';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
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

extend({ TextGeometry });
extend({ OrbitControls });

declare module '@react-three/fiber' {
  interface ThreeElements {
    textGeometry: Object3DNode<TextGeometry, typeof TextGeometry>;
    orbitControls: typeof OrbitControls & NodeProps<OrbitControls, any>;
  }
}

function CameraRig() {
  const cameraFinishPosition = new Vector3(0, 0, 500);
  const [isCameraAnimationStarted, setIsCameraAnimationStarted] = useState(false);

  useFrame(({ camera }) => {
    if (isCameraAnimationStarted) {
      camera.position.lerp(cameraFinishPosition, 0.1);
    }
  });

  useEffect(() => {
    const timerId = setTimeout(() => setIsCameraAnimationStarted(true), 2500);

    return () => clearTimeout(timerId);
  });

  return null;
}

const mouse = new Vector2();

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

  const onMouseMove = (event: MouseEvent) => {
    const x = -0.5 + (1 - event.clientX / 1850);
    const y = -0.5 + event.clientY / 940;
    mouse.x = x * 50;
    mouse.y = y;
  };

  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove);

    return () => window.removeEventListener('mousemove', onMouseMove);
  });

  useFrame(({ camera }) => {
    target.x = (1 - mouse.x) * 0.0025;
    target.y = (1 - mouse.y) * 0.0025;

    camera.rotation.x += 0.05 * (target.y - camera.rotation.x);
    camera.rotation.y += 0.05 * (target.x - camera.rotation.y);
  });

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

export default function R3F() {
  return (
    <div className='w-screen h-screen'>
      <Canvas
        dpr={[2, 2]}
        gl={{ toneMapping: NoToneMapping }}
        camera={{ position: [0, 0, 800], fov: 55 }}
      >
        <color attach='background' args={['#192928']} />
        <CameraRig />
        <Suspense fallback={null}>
          <Text word='SOMEFOLK' />
        </Suspense>
      </Canvas>
    </div>
  );
}
