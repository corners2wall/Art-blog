import Lenis from '@studio-freight/lenis';
import { clamp } from 'framer-motion';
import { useRef, useEffect, useLayoutEffect } from 'react';
import useInitialPosition from '../../hooks/useInitialPosition';
import useWindowSize from '../../hooks/useWindowSize';
import { mapRange } from '../../utils/math';
import Lottie, { LottieControl, LottieProps } from './Lottie';
import useScroll from '../../hooks/useScroll';

interface ScrollableLottieProps extends LottieProps {}

export default function ScrollableLottie(props: ScrollableLottieProps) {
  const [position, setPosition] = useInitialPosition();
  const lottieControlRef = useRef({} as LottieControl);
  const { windowHeight } = useWindowSize();
  // console.log(position?.top, position?.bottom);
  // ToDo: make universal
  const animateLottieOnScroll = ({ scroll }: Lenis) => {
    const { animation } = lottieControlRef.current;

    if (!position || !animation) return;
    // console.log(position?.top, position?.bottom);

    const totalFrames = animation.totalFrames;

    const start = position.top;
    const end = position.bottom + windowHeight;
    // console.log(start, end, position);

    // ToDo: add function for handle output value;
    const progress = clamp(
      1,
      mapRange(start, end, scroll + windowHeight, 1, totalFrames),
      totalFrames
    );

    animation.goToAndStop(progress);
  };

  useScroll(animateLottieOnScroll, [position]);

  useLayoutEffect(() => {
    setPosition(lottieControlRef.current.container);

    return () => setPosition(null);
  }, [lottieControlRef.current.container]);

  return <Lottie {...props} ref={lottieControlRef} />;
}
