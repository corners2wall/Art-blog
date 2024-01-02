import { PropsWithChildren } from 'react';

type Position = 'static' | 'fixed' | 'absolute' | 'relative' | 'sticky';

interface ScreenWrapperProps extends PropsWithChildren {
  className?: string;
  position?: Position;
}

export default function ScreenWrapper({
  children,
  className,
  position = 'relative',
}: ScreenWrapperProps) {
  return (
    <div className={`w-screen h-screen top-0 left-0 ${position} ${className}`}>{children}</div>
  );
}
