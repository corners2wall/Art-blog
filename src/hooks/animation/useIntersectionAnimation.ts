import { useEffect, useMemo, useRef } from 'react';

export interface IntersectionOptions extends IntersectionObserverInit {
  runningOn: 'top' | 'bottom' | 'always';
  threshold: number[];
}

const defaultOptions: IntersectionOptions = {
  runningOn: 'always',
  threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
};

export interface AnimationOption {
  to: number;
  duration: number;
}

// ToDo Add steps depends on threshold
// for example
// threshold: [0, 0.1, 0.2, 1]
// end value: 10
// steps should be [0, 1, 2, 10]

// ToDo stop initial animation

// ToDo pass time function

// ToDo add signature without callback

export default function useIntersectionAnimation<T extends Element>(
  callback: (node: T, to: number) => void,
  options = defaultOptions,
  animationOption: AnimationOption
) {
  const targetRef = useRef<T>(null);
  const { threshold, root, rootMargin, runningOn } = options;
  const { duration, to } = animationOption;
  const intersectionOptions = { threshold, root, rootMargin };

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
    status: 'stop',
  };

  const endAnimationTime = 1.0;

  const emitAnimationStatus = (status: string) => {
    const customEvent = new CustomEvent('change-animation-status', {
      detail: { status },
    });

    window.dispatchEvent(customEvent);
  };

  const callbackRafDecorator = (cb: any) => {
    const start = performance.now();
    let prevFraction = 0;
    animationControl.status = 'run';
    emitAnimationStatus(animationControl.status);

    function animate(time: number) {
      const timeFraction = (time - start) / duration;
      const currentFraction = timeFraction * animationControl.delta;

      animationControl.currentValue += currentFraction - prevFraction;

      prevFraction = currentFraction;

      cb(animationControl.currentValue);

      animationControl.animationFrameId = requestAnimationFrame(animate);

      // move to method
      if (timeFraction.toFixed(2) >= endAnimationTime.toFixed(2)) {
        cancelAnimationFrame(animationControl.animationFrameId);
        animationControl.status = 'stop';
        emitAnimationStatus(animationControl.status);
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
