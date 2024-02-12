import Lenis from '@studio-freight/lenis';
import { clamp } from 'framer-motion';
import { useRef, useEffect } from 'react';
import useWindowSize from '../../hooks/useWindowSize';
import { mapRange } from '../../utils/math';
import Lottie, { LottieControl, LottieProps } from './Lottie';
import useScroll from '../../hooks/useScroll';
import { useRect } from '@studio-freight/hamo';

interface ScrollableLottieProps extends LottieProps {}

export default function ScrollableLottie(props: ScrollableLottieProps) {
  const [setPosition, position] = useRect();
  const lottieControlRef = useRef({} as LottieControl);
  const { windowHeight } = useWindowSize();

  const animateLottieOnScroll = ({ scroll }: Lenis) => {
    const { animation } = lottieControlRef.current;

    if (!position || !animation) return;

    const totalFrames = animation.totalFrames;

    const start = position.top;
    const end = position.top + position.height + windowHeight;

    const progress = clamp(
      1,
      mapRange(start, end, scroll + windowHeight, 1, totalFrames),
      totalFrames
    );

    animation.setSpeed(10);
    animation.goToAndStop(progress);
  };

  useScroll(animateLottieOnScroll, [animateLottieOnScroll]);

  useEffect(() => {
    setPosition(lottieControlRef.current.container);

    return () => setPosition(null);
  }, [lottieControlRef.current.container]);

  return <Lottie {...props} ref={lottieControlRef} />;
}
