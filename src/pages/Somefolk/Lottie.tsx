import LottieWeb, { AnimationConfig, AnimationItem } from 'lottie-web';
import { ForwardedRef, forwardRef, useEffect, useRef, useState } from 'react';
import { Nullable } from '../../types/utils';

interface LottieProps extends Omit<AnimationConfig, 'container'> {
  path: string;
  className?: string;
  forwardRef: ForwardedRef<HTMLDivElement>;
}

function BaseLottie({ className, forwardRef, ...animationConfig }: LottieProps) {
  const ref = useRef<Nullable<HTMLDivElement>>(null);
  const [animation, setAnimation] = useState<AnimationItem>();
  let isFirstRender = true;

  useEffect(() => {
    if (ref.current && isFirstRender) {
      isFirstRender = false;

      const lottie = LottieWeb.loadAnimation({
        container: ref.current,
        ...animationConfig,
        loop: false,
        autoplay: false,
      });

      setAnimation(lottie);
    }

    return () => animation && animation.destroy();
  }, []);

  return (
    <div
      className={`${className} will-change-transform`}
      ref={(node) => {
        ref.current = node;
        // if (forwardRef) forwardRef.;
      }}
    />
  );
}

const Lottie = forwardRef<HTMLDivElement, LottieProps>((props, ref) => (
  <BaseLottie {...props} forwardRef={ref} />
));

export default Lottie;
