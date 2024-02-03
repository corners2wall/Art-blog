import { useRef } from 'react';
import { Nullable } from '../types/utils';

type CustomDomRect = Nullable<Omit<DOMRectReadOnly, 'toJSON'>>;

export default function useNodeInitialPosition<T extends HTMLElement>(): [
  React.MutableRefObject<CustomDomRect>,
  (node: Nullable<T>) => CustomDomRect
] {
  const nodePositionRef = useRef<CustomDomRect>(null);

  const setRef = (node: Nullable<T>) => {
    if (!node) return (nodePositionRef.current = node);

    return (nodePositionRef.current = node.getBoundingClientRect());
  };

  return [nodePositionRef, setRef];
}
