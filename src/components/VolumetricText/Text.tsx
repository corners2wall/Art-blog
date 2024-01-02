import { useLoader } from '@react-three/fiber';
import { useRef, useMemo, useState, useEffect } from 'react';
import { Group, Object3DEventMap, MeshBasicMaterial, Box3 } from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { Char } from './Char';

interface TextProps {
  word: string;
  setIsModelsLoaded(v: boolean): void;
}

export default function Text({ word, setIsModelsLoaded }: TextProps) {
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
          addCharWidth={addCharWidth}
          key={index}
        />
      )),
    [isRecalculateOffset]
  );

  return <group ref={groupRef}>{chars}</group>;
}
