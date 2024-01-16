import { ErrorBoundary } from 'react-error-boundary';
import fallbackRender from './components/FallbackRender';
import Somefolk from './pages/Somefolk';
import Lenis from '@studio-freight/lenis';
import { useEffect, useMemo } from 'react';

function useSmoothScroll() {
  const lenis = useMemo(() => new Lenis({ wheelMultiplier: 0.9, lerp: 0.025 }), []);
  let frameId = 0;

  useEffect(() => {
    function raf(time: number) {
      lenis.raf(time);
      frameId = requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => cancelAnimationFrame(frameId);
  }, []);
}

export default function Application() {
  // useSmoothScroll();

  return (
    <ErrorBoundary fallbackRender={fallbackRender}>
      <Somefolk />
    </ErrorBoundary>
  );
}
