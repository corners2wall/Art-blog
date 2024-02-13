import { CSSProperties, ElementType, PropsWithChildren, useCallback, useMemo, useRef } from 'react';
import useScroll from '../../hooks/useScroll';
import useWindowSize from '../../hooks/useWindowSize';
import Lenis from '@studio-freight/lenis';
import { Nullable } from '../../types/utils';
import { useRect } from '@studio-freight/hamo';
import { clamp, mapRange } from '../../utils/math';

interface Position {
  with: number;
  height: number;
  top: number;
  left: number;
}

type CalcValue<T> = (node: T, position: Position, meta: MetaInformation) => number;

interface MetaInformation {
  windowHeight: number;
  windowWidth: number;
}

export interface ScrollConfiguration<T> {
  getStart: CalcValue<T>;
  getEnd: CalcValue<T>;
  mapTo:
    | [start: number, end: number]
    | [start: number, end: number, reverseStart: number, reverseEnd: number];
  mutate: (node: T, value: number) => void;
  // ToDo: Add easing function
}

interface ScrollableProps<T> extends PropsWithChildren {
  wrapper?: ElementType;
  className?: string;
  style?: CSSProperties;
  configuration: ScrollConfiguration<T>[];
}

function createUserScroll<T extends HTMLElement>(
  configurations: ScrollConfiguration<T>[],
  ref: React.MutableRefObject<T | null>,
  position: Position,
  meta: MetaInformation
) {
  return configurations.map((configuration) => (lenis: Lenis) => {
    const node = ref.current;

    if (!position.top || !node) return;

    const start = configuration.getStart(node, position, meta);
    const end = configuration.getEnd(node, position, meta);

    const [mapToStart, mapToEnd, reverseStart = mapToStart, reverseEnd = mapToEnd] =
      configuration.mapTo;

    const fraction = mapRange(start, end, lenis.scroll, 0, 1);
    // console.log(fraction);

    // ToDo: time function
    const value = clamp(
      mapToStart,
      mapRange(start, end, lenis.scroll, reverseStart, reverseEnd),
      mapToEnd
    );

    configuration.mutate(node, value);
  });
}

export default function Scrollable<T extends HTMLElement>({
  children,
  style,
  className,
  configuration = [],
  wrapper: Wrapper = 'div',
}: ScrollableProps<T>) {
  const [wrapperRef, position] = useRect();
  const ref = useRef<T | null>(null);
  const { windowHeight, windowWidth } = useWindowSize();

  const setRef = (node: T | null) => {
    wrapperRef(node);
    ref.current = node;
  };

  const meta: MetaInformation = {
    windowHeight,
    windowWidth,
  };

  const scrollCallbacks = useMemo(
    () => createUserScroll(configuration, ref, position, meta),
    [configuration, ref, position, meta]
  );

  useScroll(scrollCallbacks, scrollCallbacks);

  return (
    <Wrapper style={style} className={className} ref={setRef}>
      {children}
    </Wrapper>
  );
}
