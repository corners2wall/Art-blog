import { useCallback, useState } from 'react';
import { Nullable } from '../types/utils';

type CustomDomRect = Nullable<Omit<DOMRectReadOnly, 'toJSON'>>;

export default function useInitialPosition<T extends HTMLElement>(): [
  CustomDomRect,
  (node: Nullable<T>) => void
] {
  const [initialPosition, setInitialPosition] = useState<CustomDomRect>(null);

  const setPosition = useCallback((node: Nullable<T>) => {
    setInitialPosition(() => node?.getBoundingClientRect() || null);
  }, []);

  return [initialPosition, setPosition];
}
