import { useEffect } from 'react';
import { useApplicationContext } from '../container/ApplicationContext';
import Lenis from '@studio-freight/lenis';

type scrollCallback = (lenis: Lenis) => void;

function useScroll(callback: scrollCallback, deps: any[]): void;
function useScroll(callback: scrollCallback[], deps: any[]): void;
function useScroll(callback: scrollCallback | scrollCallback[], deps: any[] = []): void {
  const { lenis } = useApplicationContext();
  const callbacks = Array.isArray(callback) ? callback : [callback];

  useEffect(() => {
    callbacks.forEach((cb) => lenis.on('scroll', cb));

    lenis.emit();

    return () => callbacks.forEach((cb) => lenis.off('scroll', cb));
  }, [lenis, callback, ...callbacks, ...deps]);
}

export default useScroll;
