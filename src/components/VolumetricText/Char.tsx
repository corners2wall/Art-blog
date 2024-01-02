import { useLayoutEffect as useEffect, useRef, useState } from 'react';
import { Mesh, MeshBasicMaterial } from 'three';
import { useFrame, Object3DNode, extend } from '@react-three/fiber';
import { Font } from 'three/examples/jsm/loaders/FontLoader';
import { lerp } from 'three/src/math/MathUtils';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';

declare module '@react-three/fiber' {
  interface ThreeElements {
    textGeometry: Object3DNode<TextGeometry, typeof TextGeometry>;
  }
}

extend({ TextGeometry });

interface CharProps {
  font: Font;
  char: string;
  materials: MeshBasicMaterial[];
  index: number;
  addCharWidth: (width: number) => void;
  offsets: number[];
}

export function Char({ font, char, materials, offsets, index, addCharWidth }: CharProps) {
  const fontOptions = {
    font,
    size: 60,
    height: 0,
    bevelEnabled: true,
    bevelSize: 3,
    bevelOffset: 1,
  };
  const [isAnimationRun, setIsAnimationRun] = useState(false);

  // in first render offsets.length equal 0
  const isFinalRender = !!offsets.length;

  const [frontMaterial, borderMaterial] = materials;
  const charMaterials = isFinalRender ? materials : frontMaterial;

  const ref = useRef<Mesh>(null);

  useEffect(() => {
    if (ref.current) {
      const mesh = ref.current;
      const offsetX = offsets.slice(0, index).reduce((sum, current) => sum + current, 0);

      mesh.geometry.computeBoundingBox();

      mesh.position.setX(offsetX);
      mesh.scale.setY(0.5);

      mesh.geometry.translate(0, -mesh.geometry.boundingBox!.max.y * 0.5, 0);
    }
  });

  useEffect(() => {
    const timeoutId = setTimeout(() => setIsAnimationRun(true), 2000 + 125 * index);

    return () => clearTimeout(timeoutId);
  });

  useEffect(() => {
    if (ref.current) addCharWidth(ref.current.geometry.boundingBox!.max.x);
  }, []);

  useFrame(() => {
    const rotation = Math.PI * 2;
    const firstQuarterRotation = Math.PI / 2;
    const quarterRotationToEnd = rotation - Math.PI / 2;

    if (ref.current && isAnimationRun) {
      const mesh = ref.current;
      const currentRotation = mesh.rotation.x;

      if (currentRotation > firstQuarterRotation) mesh.material = borderMaterial;

      if (currentRotation > quarterRotationToEnd) mesh.material = materials;

      mesh.rotation.x = lerp(currentRotation, rotation, 0.035);
    }
  });

  return (
    <mesh ref={ref} args={[, charMaterials]}>
      <textGeometry args={[char, fontOptions]} />
    </mesh>
  );
}
