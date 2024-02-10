import { ElementType, PropsWithChildren, useRef } from 'react';

interface ScrollableProps<T> extends PropsWithChildren {
  wrapper?: ElementType;
  className?: string;
}

export default function Scrollable<T extends HTMLElement>({
  children,
  className,
  wrapper: Wrapper = 'div',
}: ScrollableProps<T>) {
  const ref = useRef(null);

  return (
    <Wrapper className={className} ref={ref}>
      {children}
    </Wrapper>
  );
}
