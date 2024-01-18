import Lenis from '@studio-freight/lenis';
import { PropsWithChildren, createContext, useContext } from 'react';
import useSmoothScroll from '../hooks/useSmoothScroll';

interface ApplicationContext {
  lenis: Lenis;
}

export const ApplicationContext = createContext<ApplicationContext | null>(null);

export function ApplicationWrapper({ children }: PropsWithChildren) {
  const lenis = useSmoothScroll();

  return <ApplicationContext.Provider value={{ lenis }}>{children}</ApplicationContext.Provider>;
}

export function useApplicationContext() {
  const context = useContext(ApplicationContext);

  if (!context) throw new Error('Use hook into application context');

  return context;
}
