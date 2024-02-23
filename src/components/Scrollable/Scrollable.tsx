import {
  CSSProperties,
  ElementType,
  ForwardedRef,
  PropsWithChildren,
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react';
import useScroll from '../../hooks/useScroll';
import useWindowSize from '../../hooks/useWindowSize';
import Lenis from '@studio-freight/lenis';
import { useRect } from '@studio-freight/hamo';
import { clamp, mapRange } from '../../utils/math';

interface Position {
  with: number;
  height: number;
  top: number;
  left: number;
}

export type CalcValue<T> = (element: T, position: Position, meta: MetaInformation) => number;

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

interface BaseScrollableProps<T> extends PropsWithChildren {
  wrapper?: ElementType;
  className?: string;
  style?: CSSProperties;
  configuration: ScrollConfiguration<T>[];
  forwardRef?: ForwardedRef<T | null>;
}

function createUserScroll<T extends HTMLElement>(
  configurations: ScrollConfiguration<T>[],
  ref: React.MutableRefObject<T | null>,
  position: Position,
  meta: MetaInformation
) {
  return configurations.map((configuration) => (lenis: Lenis) => {
    const node = ref.current;
    const scroll = lenis.scroll;

    if (!node) return;

    const start = configuration.getStart(node, position, meta);
    const end = configuration.getEnd(node, position, meta);
    const [mapToStart, mapToEnd, reverseStart = mapToStart, reverseEnd = mapToEnd] =
      configuration.mapTo;

    if (scroll < start) {
      configuration.mutate(node, reverseStart);
      return;
    }
    if (scroll > end) {
      configuration.mutate(node, reverseEnd);

      return;
    }

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

export function BaseScrollable<T extends HTMLElement>({
  children,
  style,
  className,
  forwardRef,
  configuration = [],
  wrapper: Wrapper = 'div',
}: BaseScrollableProps<T>) {
  const [wrapperRef, position] = useRect();
  const ref = useRef<T | null>(null);
  const { windowHeight, windowWidth } = useWindowSize();

  const setRef = (node: T | null) => {
    wrapperRef(node);
    ref.current = node;
  };

  useImperativeHandle(forwardRef, () => ref.current!, [ref.current]);

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
    <Wrapper style={style} className={`will-change-transform ${className}`} ref={setRef}>
      {children}
    </Wrapper>
  );
}

interface ScrollableProps<T> extends Omit<BaseScrollableProps<T>, 'forwardRef'> {}

const Scrollable = forwardRef<HTMLElement, ScrollableProps<HTMLElement>>((props, ref) => (
  <BaseScrollable {...props} forwardRef={ref} />
));

export default Scrollable;
