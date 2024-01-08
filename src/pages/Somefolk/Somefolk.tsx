import getImageUrl from '../../utils/getImageUrl';
import { useEffect, useMemo, useRef, useState } from 'react';
import VolumetricText from '../../components/VolumetricText';
import ScreenWrapper from '../../components/ScreenWrapper';
import OverlayLayer from '../../components/OverlayLayer';
import Tile from '../../components/Tile';
import { animateValue } from 'framer-motion';

const tileImage = getImageUrl('background', 'jpg');

function debounce(callback: (...args: any) => void, delay: number) {
  let timerId: NodeJS.Timeout | undefined = undefined;

  return (...args: any) => {
    clearTimeout(timerId);

    timerId = setTimeout(() => callback(...args), delay);
  };
}

const lerp = (start: number, end: number, t: number) => start * (1 - t) + end * t;

// think about accumulate end
// hold end in scrollState
// maybe use throttle instance of debounce?
function useSmoothScroll() {
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
    // debugger;
    scrollState.start = window.scrollY;
  };

  const preventDefault = (e: Event) => e.preventDefault();

  useEffect(() => {
    resetScroll();
    window.addEventListener('wheel', onWheel);
    // window.addEventListener('DOMContentLoaded', () => resetScroll);

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

// ref: https://www.somefolk.co.uk/
export default function Somefolk() {
  const [isModelsLoaded, setIsModelsLoaded] = useState(false);
  // useSmoothScroll();

  return (
    <div className='text-olive-100 bg-olive-900 font-arges'>
      <ScreenWrapper className='overflow-hidden'>
        {isModelsLoaded && (
          <>
            {/* <Tile image={tileImage} /> */}
            <OverlayLayer />
          </>
        )}
        <ScreenWrapper position='absolute'>
          <VolumetricText setIsModelsLoaded={setIsModelsLoaded} word='SOMEFOLK' />
        </ScreenWrapper>
      </ScreenWrapper>
      <Layout />
      {/* <Layout />
      <Layout /> */}
      <ScreenWrapper className='bg-somefolk'></ScreenWrapper>
      <ScreenWrapper className='bg-somefolk'></ScreenWrapper>
    </div>
  );
}

interface IntersectionOptions extends IntersectionObserverInit {
  runningOn: 'top' | 'bottom' | 'always';
  threshold: number[];
}

const defaultOptions: IntersectionOptions = {
  runningOn: 'always',
  threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
};

function useIntersectionAnimation<T extends Element>(
  callback: (node: T, to: number) => void,
  options = defaultOptions,
  animationOption: AnimationOption
) {
  const targetRef = useRef<T>(null);
  const { threshold, root, rootMargin, runningOn } = options;
  const { duration, to } = animationOption;
  const intersectionOptions = { threshold, root, rootMargin };

  const step = to / (Array.isArray(threshold) ? threshold.length - 1 : 1);

  // should be pass initial, end value
  const generateSteps = (threshold: number[], endValue: number) => {
    const delta = to / (Array.isArray(threshold) ? threshold.length - 1 : 1);
    const steps = threshold.map((_, index) => delta * index);
    // const st
    steps[0] = 0; // toDo change on initial value
    steps[steps.length - 1] = endValue;

    return steps;
  };

  const checkIsBottomPageIntersect = (entry: IntersectionObserverEntry) =>
    // error work when intersectionRatio === 1
    entry.boundingClientRect.top > 0;

  const checkIsTopPageIntersect = (entry: IntersectionObserverEntry) =>
    !!(entry.boundingClientRect.top < 0);

  const getThresholdValueByIntersectionRatio = (
    threshold: number[],
    intersectionRation: number
  ) => {
    const deltaValues = threshold.map((item) => Math.abs(item - intersectionRation));

    const minDeltaValue = Math.min(...deltaValues);

    const index = deltaValues.indexOf(minDeltaValue);

    return threshold[index];
  };

  const getIntersectionRatio = (threshold: number[], intersectionRatio: number) => {
    if (intersectionRatio === 1) return threshold[threshold.length - 1];

    if (intersectionRatio === 0) return threshold[0];

    return getThresholdValueByIntersectionRatio(threshold, intersectionRatio);
  };

  // Should be pass parameters
  const animationControl = {
    animationFrameId: 0,
    currentValue: 0,
    endValue: 0,
    delta: 0,
  };

  const endAnimationTime = 1;

  const callbackRafDecorator = (cb: any) => {
    const start = performance.now();
    let prevFraction = 0;

    function animate(time: number) {
      const timeFraction = (time - start) / duration;
      const currentFraction = timeFraction * animationControl.delta;

      animationControl.currentValue += currentFraction - prevFraction;

      prevFraction = currentFraction;

      cb(animationControl.currentValue);

      animationControl.animationFrameId = requestAnimationFrame(animate);

      if (timeFraction.toFixed(2) === endAnimationTime.toFixed(2)) {
        cancelAnimationFrame(animationControl.animationFrameId);
      }
    }

    requestAnimationFrame(animate);
  };

  const steps = generateSteps(threshold, to);

  const handleIntersect: IntersectionObserverCallback = (entries) => {
    entries.forEach((entry) => {
      const intersectionRatio = getIntersectionRatio(threshold, entry.intersectionRatio);

      const intersectionRatioIndex = threshold.indexOf(intersectionRatio);

      animationControl.endValue = steps[intersectionRatioIndex];
      animationControl.delta = animationControl.endValue - animationControl.currentValue;

      cancelAnimationFrame(animationControl.animationFrameId);

      callbackRafDecorator((v: number) => callback(targetRef.current!, v));

      // const isBottomIntersect = checkIsBottomPageIntersect(entry);
      // const isTopIntersect = checkIsTopPageIntersect(entry);

      // if (runningOn === 'top' && isTopIntersect)
      //   callback(targetRef.current, entry.intersectionRatio, animationOption.to);

      // if (runningOn === 'bottom' && isBottomIntersect)
      //   callback(targetRef.current, entry.intersectionRatio, animationOption.to);

      // if (runningOn === 'always')
      //   callback(targetRef.current, entry.intersectionRatio, animationOption.to);
    });
  };

  const intersectionObserver = useMemo(
    () => new IntersectionObserver(handleIntersect, intersectionOptions),
    []
  );

  useEffect(() => {
    if (targetRef.current) intersectionObserver.observe(targetRef.current);

    return () => intersectionObserver.unobserve(targetRef.current!);
  }, []);

  return { targetRef, animationControl };
}

interface AnimationOption {
  to: number;
  duration: number;
}

function Layout() {
  const intersectionOptions: IntersectionOptions = {
    runningOn: 'bottom',
    threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
  };

  const animationOption: AnimationOption = {
    to: 1,
    duration: 1000,
  };

  const animationCallback = (element: HTMLDivElement, v: any) => {
    element.style.opacity = v;
  };

  const { targetRef } = useIntersectionAnimation(
    animationCallback,
    intersectionOptions,
    animationOption
  );
  return (
    <div className='p-[1vw] h-auto leading-none mt-6'>
      <div className='inline-flex items-center mb-[-4.5vw] tracking-[0.05vw]' ref={targetRef}>
        <h2 className='text-[21vw] font-black'>RUSSIA</h2>
        <div className='w-[8vw] h-[1vw] bg-olive-100 mx-[0.5vw] mb-[4.5vw]' />
        <h2 className='text-[21vw] font-black'>BASED</h2>
        <h2 className='text-[21vw] font-black ml-[3.5vw]'>ART</h2>
      </div>
      <div className='inline-flex items-center mb-[-4.5vw] tracking-[0.05vw] mt-6'>
        <h2 className='text-[21vw] font-black'>DIRECTOR</h2>
        <div className='w-[1vw] h-[10vw] bg-olive-100 mx-[2vw] mb-[4.5vw]' />
        <h2 className='text-[21vw] font-black'>DESIGNER</h2>
      </div>
      <div className='inline-flex items-center mb-[-4.5vw] tracking-[0.15vw] mt-6'>
        <h2 className='text-[20vw] font-black'>CREATIVE DEVELOPER</h2>
      </div>
    </div>
  );
}
