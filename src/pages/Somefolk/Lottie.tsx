import LottieWeb, { AnimationConfig, AnimationConfigWithPath, AnimationItem } from 'lottie-web';
import { useEffect, useRef, useState } from 'react';

interface LottieProps extends Omit<AnimationConfig, 'container'> {
  path: string;
  className?: string;
}

export default function Lottie({ className, ...animationConfig }: LottieProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [animation, setAnimation] = useState<AnimationItem>();
  let isFirstRender = true;

  useEffect(() => {
    if (ref.current && isFirstRender) {
      isFirstRender = false;

      const lottie = LottieWeb.loadAnimation({
        container: ref.current,
        ...animationConfig,
      });

      setAnimation(lottie);
    }

    return () => animation && animation.destroy();
  }, []);

  return <div className={className} ref={ref}></div>;
}
