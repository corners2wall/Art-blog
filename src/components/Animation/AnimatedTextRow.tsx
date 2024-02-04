import { PropsWithChildren, useRef } from 'react';
import useRequestAnimationFrame from '../../hooks/animation/useRequestAnimationFrame';
import useScrollAnimation from '../../hooks/animation/useScrollAnimation';
import { AnimationOptions } from '../../utils/Animation';
import { IntersectionOptions } from '../../utils/ScrollAnimation';

type AnimatedTextRowProps = PropsWithChildren & {
  containerClassName?: string;
};

export default function AnimatedTextRow({ children, containerClassName }: AnimatedTextRowProps) {
  // ToDO

  return (
    <div className={`flex items-center mb-[-4.5vw] tracking-[0.05vw] ${containerClassName}`}>
      {children}
    </div>
  );
}
