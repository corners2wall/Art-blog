import { useEffect, useRef, useState } from 'react';

export default function useHover<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  const [isHover, setIsHover] = useState(false);

  const setHoverTrue = () => setIsHover(true);

  const setHoverFalse = () => setIsHover(false);

  useEffect(() => {
    const node = ref.current;

    if (node) {
      node.addEventListener('mouseover', setHoverTrue);
      node.addEventListener('mouseleave', setHoverFalse);

      return () => {
        node.removeEventListener('mouseover', setHoverTrue);
        node.removeEventListener('mouseleave', setHoverFalse);
      };
    }
  }, [ref.current, isHover]);

  return { ref, isHover };
}
