import { useEffect } from 'react';
import { useApplicationContext } from '../container/ApplicationContext';
import Lenis from '@studio-freight/lenis';

export default function useScroll(callback: (lenis: Lenis) => void, deps: any[] = []) {
  const { lenis } = useApplicationContext();

  useEffect(() => {
    lenis.on('scroll', callback);
    lenis.emit();

    return () => lenis.off('scroll', callback);
  }, [lenis, callback, ...deps]);
}
