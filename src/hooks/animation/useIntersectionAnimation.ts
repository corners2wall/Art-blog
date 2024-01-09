import { useEffect, useMemo, useRef } from 'react';
import Animation from '../../utils/Animation';

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
  const animation = useMemo(() => new Animation(), []);

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

  const steps = generateSteps(threshold, to);

  const handleIntersect: IntersectionObserverCallback = (entries) => {
    entries.forEach((entry) => {
      const intersectionRatio = getIntersectionRatio(threshold, entry.intersectionRatio);

      const intersectionRatioIndex = threshold.indexOf(intersectionRatio);

      animation.setEnd(steps[intersectionRatioIndex]);

      cancelAnimationFrame(animation.getFrameId());

      animation.animate({ duration }, (v: number) => callback(targetRef.current!, v));
      // callbackRafDecorator((v: number) => callback(targetRef.current!, v));

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

  return { targetRef, animation };
}
