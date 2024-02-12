import { useCallback, useEffect, useRef, useState } from 'react';
import { Nullable } from '../types/utils';

export type CustomDomRect = Omit<DOMRectReadOnly, 'toJSON'>;

export default function useInitialPosition<T extends HTMLElement>(): [
  Nullable<CustomDomRect>,
  (node: Nullable<T>) => void
] {
  const [initialPosition, setInitialPosition] = useState<Nullable<CustomDomRect>>(null);
  const ref = useRef<T | null>(null);

  useEffect(() => {
    if (ref.current) {
      setInitialPosition(ref.current.getBoundingClientRect());
    }
  }, []);

  const setPosition = useCallback((node: Nullable<T>) => {
    ref.current = node;
    // setInitialPosition(() => node?.getBoundingClientRect() || null);
  }, []);

  return [initialPosition, setPosition];
}
