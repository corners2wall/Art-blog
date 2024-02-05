import Lenis from '@studio-freight/lenis';
import { useMemo, useEffect } from 'react';

export default function useSmoothScroll() {
  const lenis = useMemo(() => new Lenis({ wheelMultiplier: 0.9 }), []);
  let frameId = 0;

  useEffect(() => {
    function raf(time: number) {
      lenis.raf(time);
      frameId = requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => cancelAnimationFrame(frameId);
  }, []);

  return lenis;
}
