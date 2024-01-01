import { AnimationScope } from 'framer-motion';
import { PropsWithChildren } from 'react';

export function TileScope({
  children,
  scopeRef,
}: PropsWithChildren & { scopeRef: AnimationScope<HTMLDivElement> }) {
  return (
    <div className='scale-50 w-screen h-screen origin-top-left' ref={scopeRef}>
      {children}
    </div>
  );
}

export function TileRow({ children }: PropsWithChildren) {
  return <div className='flex gap-5'>{children}</div>;
}

export function TileWrapper({ children }: PropsWithChildren) {
  return (
    <div className='absolute -left-1/2 -top-1/2 flex flex-col items-center gap-5'>{children}</div>
  );
}
