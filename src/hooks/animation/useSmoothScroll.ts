import { useEffect } from 'react';
import { lerp } from '../../utils/timeFunctions';
import { debounce } from '../../utils/debounce';

// think about accumulate end
// hold end in scrollState
// maybe use throttle instance of debounce?

// ToDo try get logic from useIntersectionAnimation
export default function useSmoothScroll() {
  let scrollSpeedCoefficient = 0.75;
  const scrollState = { start: 0, delta: 0, cancelFrame: 0 };

  function updateScroll(end: number) {
    cancelAnimationFrame(scrollState.cancelFrame);
    scrollState.delta = 0;
    const start = performance.now();

    function changeScrollPosition(time: number) {
      scrollState.start = lerp(scrollState.start, end, 0.05);
      scrollState.cancelFrame = requestAnimationFrame(changeScrollPosition);

      window.scrollTo(0, scrollState.start);

      if (scrollState.start.toFixed(1) === end.toFixed(1)) {
        cancelAnimationFrame(scrollState.cancelFrame);
      }
    }

    requestAnimationFrame(changeScrollPosition);
  }

  const debounceUpdateScroll = debounce(updateScroll, 100);

  // store delta value in
  const onWheel = (event: WheelEvent) => {
    scrollState.delta += event.deltaY * scrollSpeedCoefficient;

    debounceUpdateScroll(scrollState.start + scrollState.delta);
  };

  const resetScroll = () => {
    scrollState.start = window.scrollY;
  };

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
