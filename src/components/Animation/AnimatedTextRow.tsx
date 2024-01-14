import { PropsWithChildren, useRef } from 'react';
import useRequestAnimationFrame from '../../hooks/animation/useRequestAnimationFrame';
import useScrollAnimation from '../../hooks/animation/useScrollAnimation';
import { AnimationOptions } from '../../utils/Animation';
import { IntersectionOptions } from '../../utils/ScrollAnimation';

type AnimatedTextRowProps = PropsWithChildren & {
  containerClassName?: string;
};

export default function AnimatedTextRow({ children, containerClassName }: AnimatedTextRowProps) {
  const intersectionOptions: IntersectionOptions = {
    runningOn: 'bottom',
    threshold: [0.5, 0.6, 0.7, 0.8, 0.9, 1],
  };

  const animationOption: AnimationOptions = {
    end: -15,
    duration: 500,
  };

  const ref = useRef<HTMLDivElement>(null);

  const { targetRef, animation } = useScrollAnimation<HTMLDivElement>(
    intersectionOptions,
    animationOption
  );

  const showChangeValue = (v: number) => {
    if (ref.current) ref.current.style.transform = `translateY(${v}px)`;
  };

  useRequestAnimationFrame(showChangeValue, animation);

  return (
    <div ref={targetRef}>
      <div
        className={`flex items-center mb-[-4.5vw] tracking-[0.05vw] ${containerClassName}`}
        ref={ref}
      >
        {children}
      </div>
    </div>
  );
}
