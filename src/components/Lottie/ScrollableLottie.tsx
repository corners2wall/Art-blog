import Lenis from '@studio-freight/lenis';
import { clamp } from 'framer-motion';
import { useRef, useEffect } from 'react';
import useWindowSize from '../../hooks/useWindowSize';
import { mapRange } from '../../utils/math';
import Lottie, { Animation, LottieControl, LottieProps } from './Lottie';
import useScroll from '../../hooks/useScroll';
import { useRect } from '@studio-freight/hamo';
import { CalcValue } from '../Scrollable/Scrollable';

interface ScrollConfiguration {
  getStart: CalcValue<Animation>;
  getEnd: CalcValue<Animation>;
}

interface ScrollableLottieProps extends LottieProps {
  scrollConfiguration: ScrollConfiguration;
}

export default function ScrollableLottie(props: ScrollableLottieProps) {
  const [setPosition, position] = useRect();
  const lottieControlRef = useRef({} as LottieControl);
  const { windowHeight, windowWidth } = useWindowSize();

  const meta = {
    windowHeight,
    windowWidth,
  };

  const animateLottieOnScroll = (lenis: Lenis) => {
    const { animation } = lottieControlRef.current;
    const { getStart, getEnd } = props.scrollConfiguration;
    const scroll = lenis.scroll + windowHeight;

    if (!position || !animation) return;

    const totalFrames = animation.totalFrames;
    const start = getStart(animation, position, meta);
    const end = getEnd(animation, position, meta);

    if (scroll < start) {
      animation.goToAndStop(0);
      return;
    }

    if (scroll > end) {
      animation.goToAndStop(totalFrames);
      return;
    }

    const progress = clamp(1, mapRange(start, end, scroll, 1, totalFrames), totalFrames);

    animation.frameModifier = 1;
    animation.goToAndStop(progress);
  };

  useScroll(animateLottieOnScroll, [animateLottieOnScroll]);

  useEffect(() => {
    setPosition(lottieControlRef.current.container);

    return () => setPosition(null);
  }, [lottieControlRef.current.container]);

  return <Lottie {...props} ref={lottieControlRef} />;
}
