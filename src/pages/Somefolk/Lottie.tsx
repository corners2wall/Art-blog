import LottieWeb, { AnimationItem } from 'lottie-web';
import { useEffect, useRef, useState } from 'react';

interface LottieProps {
  path: string;
  className?: string;
}

export default function Lottie({ path, className }: LottieProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [animation, setAnimation] = useState<AnimationItem>();
  let isFirstRender = true;

  useEffect(() => {
    if (ref.current && isFirstRender) {
      isFirstRender = false;

      const lottie = LottieWeb.loadAnimation({
        container: ref.current,
        renderer: 'svg',
        loop: false,
        autoplay: false,
        path,
      });

      setAnimation(lottie);
    }

    return () => animation && animation.destroy();
  }, []);

  return <div className={className} ref={ref}></div>;
}
