import { CSSProperties, ElementType, PropsWithChildren, useCallback, useRef } from 'react';
import useScroll from '../../hooks/useScroll';
import useWindowSize from '../../hooks/useWindowSize';
import Lenis from '@studio-freight/lenis';
import { Nullable } from '../../types/utils';

type CalcValue<T> = (node: T, position: any) => number;

interface ScrollConfiguration<T> {
  start: number | CalcValue<T>;
  end: number | CalcValue<T>;
  mapTo: [start: number, end: number];
  mutate: (node: T, value: number) => void;
  // ToDo: Add easing function
}

interface ScrollableProps<T> extends PropsWithChildren {
  wrapper?: ElementType;
  className?: string;
  style?: CSSProperties;
  configuration?: ScrollConfiguration<T>[];
}

export default function Scrollable<T extends HTMLElement>({
  children,
  style,
  className,
  configuration,
  wrapper: Wrapper = 'div',
}: ScrollableProps<T>) {
  const ref = useRef<T | null>(null);
  const { windowHeight, windowWidth } = useWindowSize();
  // const [initialPosition, setInitialPosition] = useInitialPosition<T>();

  const setRef = useCallback((node: Nullable<T>) => {
    // setInitialPosition(node);
    ref.current = node;
  }, []);

  function createUserScroll(configurations: ScrollConfiguration<T>[]) {
    configurations.map((conf) => (lenis: Lenis) => {});
  }

  const onScroll = ({ scroll }: Lenis) => {
    // if (!initialPosition || !ref.current) return;
    // const start = configuration.start;
    // const start = typeof configuration.start === 'function' ?
  };

  useScroll(onScroll, [onScroll]);

  return (
    <Wrapper style={style} className={className} ref={setRef}>
      {children}
    </Wrapper>
  );
}

const example: ScrollConfiguration<HTMLDivElement> = {
  start: (node, position) => position.top,
  end: (node, position) => position.bottom,
  mapTo: [31, 14],
  mutate: (node, value) => node.style.setProperty('--circleXOffset', `${value}vw`),
};
