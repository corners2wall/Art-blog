import lottie, { AnimationConfig, AnimationItem } from 'lottie-web';
import {
  ForwardedRef,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Nullable } from '../../types/utils';

export type LottieControl = {
  container: Nullable<HTMLDivElement>;
  animation: Nullable<AnimationItem>;
};

interface BaseLottieProps extends Omit<AnimationConfig, 'container'> {
  path: string;
  className?: string;
  forwardRef: ForwardedRef<LottieControl>;
}

// ToDo What do frameModifier and frameMult
function BaseLottie({ className, forwardRef, ...animationConfig }: BaseLottieProps) {
  const [isAnimationLoaded, setIsAnimationLoaded] = useState(false);
  const animationRef = useRef<Nullable<AnimationItem>>(null);
  const containerRef = useRef<Nullable<HTMLDivElement>>(null);

  useEffect(() => {
    // console.log(containerRef.current?.getBoundingClientRect());
  }, [containerRef.current]);

  // useImperativeHandle(
  //   forwardRef,
  //   () => {
  //     return { container: containerRef.current, animation: animationRef.current };
  //   },
  //   [containerRef.current]
  // );

  useEffect(() => {
    if (containerRef.current) {
      animationRef.current?.destroy();

      // Promise.resolve(
      //   lottie.loadAnimation({
      //     container: containerRef.current,
      //     loop: false,
      //     autoplay: false,
      //     ...animationConfig,
      //   })
      // )
      //   .then((lottieAnimation) => (animationRef.current = lottieAnimation))
      //   .then(() => setIsAnimationLoaded(() => true));

      animationRef.current = lottie.loadAnimation({
        container: containerRef.current,
        loop: false,
        autoplay: false,
        ...animationConfig,
      });

      debugger;

      setIsAnimationLoaded(() => true);
    }

    return () => {
      if (animationRef.current) {
        animationRef.current.destroy();
      }
    };
  }, []);

  const customRef = (container: Nullable<HTMLDivElement>) => {
    // debugger;
    console.log(container?.getBoundingClientRect());
    console.log(container);

    containerRef.current = container;
  };

  const View = <div ref={customRef} />;

  return <div className={`${className} will-change-transform`}>{View}</div>;
}

export interface LottieProps extends Omit<BaseLottieProps, 'forwardRef'> {}

const Lottie = forwardRef<LottieControl, LottieProps>((props, ref) => (
  <BaseLottie {...props} forwardRef={ref} />
));

export default Lottie;
