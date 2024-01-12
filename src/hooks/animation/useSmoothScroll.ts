import { useEffect } from 'react';
import { lerp } from '../../utils/timeFunctions';
import { debounce } from '../../utils/debounce';
import Animation from '../../utils/Animation';

// think about accumulate end
// hold end in scrollState
// maybe use throttle instance of debounce?

// ToDo try get logic from useIntersectionAnimation
const circ = (timeFraction: number) => {
  return 1 - Math.sin(Math.acos(timeFraction));
};

type TimingFn = (timeFraction: number) => number;

const makeEaseOut = (timeFn: TimingFn) => (time: number) => 1 - timeFn(1 - time);

const easeOutCirc = circ;

export default function useSmoothScroll() {
  let scrollSpeedCoefficient = 0.75;
  const scrollAnimation = new Animation();

  const debounceUpdateScroll = debounce(scrollAnimation.animate, 100);

  const animationCallback = (v: number) => {
    window.scrollTo(0, v);
  };

  const onWheel = (event: WheelEvent) => {
    const currentValue = Math.round(scrollAnimation.getStart());
    const delta = event.deltaY * scrollSpeedCoefficient;

    const isStartPage = currentValue + delta < 0;
    const isEndPage = currentValue + delta > document.body.offsetHeight;

    let end = currentValue + delta;

    if (isStartPage) end = 0;

    if (isEndPage) end = document.body.offsetHeight;

    scrollAnimation.animate({ end, duration: 1000, timeFunction: easeOutCirc }, animationCallback);
  };

  const resetScroll = () => scrollAnimation.setStart(window.scrollY);

  const preventDefault = (e: Event) => e.preventDefault();

  useEffect(() => {
    resetScroll();
    window.addEventListener('wheel', onWheel);

    return () => window.removeEventListener('wheel', onWheel);
  }, []);

  useEffect(disableScroll);

  function disableScroll() {
    window.addEventListener('DOMMouseScroll', preventDefault, { passive: false });
    window.addEventListener('wheel', preventDefault, { passive: false });

    // ToDo check performance on mobile device
    // window.addEventListener('touchmove', preventDefault, { passive: false });

    // enableScroll
    return () => {
      window.removeEventListener('DOMMouseScroll', preventDefault);
      window.removeEventListener('wheel', preventDefault);
      window.removeEventListener('touchmove', preventDefault);
    };
  }
}
