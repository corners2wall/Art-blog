import lottie, { AnimationConfig, AnimationItem } from 'lottie-web';
import { ForwardedRef, forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { Nullable } from '../../types/utils';

interface Animation extends AnimationItem {
  frameModifier: number;
}

export type LottieControl = {
  container: Nullable<HTMLDivElement>;
  animation: Nullable<Animation>;
};

interface BaseLottieProps extends Omit<AnimationConfig, 'container'> {
  path: string;
  className?: string;
  forwardRef: ForwardedRef<LottieControl>;
}

// ToDo What do frameModifier and frameMult
function BaseLottie({ className, forwardRef, ...animationConfig }: BaseLottieProps) {
  const animationRef = useRef<Nullable<Animation>>(null);
  const containerRef = useRef<Nullable<HTMLDivElement>>(null);

  useImperativeHandle(
    forwardRef,
    () => ({ container: containerRef.current, animation: animationRef.current }),
    [containerRef.current]
  );

  const customRef = useCallback((container: Nullable<HTMLDivElement>) => {
    containerRef.current = container;
    animationRef.current?.destroy();

    if (container) {
      animationRef.current = lottie.loadAnimation({
        container,
        loop: false,
        autoplay: false,
        ...animationConfig,
      }) as Animation;
    }
  }, []);

  return <div className={`${className} will-change-transform`} ref={customRef} />;
}

export interface LottieProps extends Omit<BaseLottieProps, 'forwardRef'> {}

const Lottie = forwardRef<LottieControl, LottieProps>((props, ref) => (
  <BaseLottie {...props} forwardRef={ref} />
));

export default Lottie;
