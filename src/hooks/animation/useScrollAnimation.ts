import { useEffect, useMemo, useRef } from 'react';
import Animation, { AnimationOptions } from '../../utils/Animation';
import ScrollAnimation, { IntersectionOptions } from '../../utils/ScrollAnimation';

export default function useScrollAnimation<T extends Element>(
  intersectionOption: IntersectionOptions,
  animationOption: AnimationOptions,
  callback?: (node: T, to: number) => void
) {
  const targetRef = useRef<T>(null);

  const scrollAnimation = useMemo(
    () => new ScrollAnimation(intersectionOption, animationOption, callback as any),
    []
  );

  useEffect(() => {
    if (targetRef.current) scrollAnimation.subscribe(targetRef.current);

    return () => scrollAnimation.unsubscribe(targetRef.current!);
  }, [targetRef.current]);

  return { targetRef, animation: scrollAnimation.getAnimation() };
}
