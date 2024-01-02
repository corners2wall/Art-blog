import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { NoToneMapping } from 'three';
import { CameraRig } from './CameraRig';
import { OrbitControl } from './OrbitControl';
import Text from './Text';

interface VolumetricTextProps {
  setIsModelsLoaded(v: boolean): void;
  word: string;
}

export default function VolumetricText({ setIsModelsLoaded, word }: VolumetricTextProps) {
  return (
    <Canvas gl={{ toneMapping: NoToneMapping }} camera={{ position: [0, 0, 800], fov: 55 }}>
      <CameraRig />
      <OrbitControl />
      <Suspense>
        <Text word={word} setIsModelsLoaded={setIsModelsLoaded} />
      </Suspense>
    </Canvas>
  );
}
