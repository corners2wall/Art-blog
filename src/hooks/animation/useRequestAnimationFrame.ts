import { useEffect, useState } from 'react';
import IntersectionAnimation, {
  AnimationStatus,
  ChangeAnimationStatusEvent,
} from '../../utils/Animation';

// I need state for animation
// when parent animation will pause
// I should stop this animation too

// Maybe dispatch custom event
// and related animation should be subscribe on this event

// ToDo googling why we need store value in ref.current instance of variable

export default function useRequestAnimationFrame(
  callback: (value: number) => void,
  animation: IntersectionAnimation
) {
  let frameId = 0;

  // should be hold boolean or enum
  // enum
  const [animationStatus, setAnimationStatus] = useState<AnimationStatus>(animation.getStatus());
  // con
  // check previous status and current
  const changeAnimationStatus = (status: ChangeAnimationStatusEvent) => {
    if (animationStatus !== status.detail.animationStatus)
      setAnimationStatus(status.detail.animationStatus);
  };

  useEffect(() => {
    // ToDo make it event with uniq animation id
    window.addEventListener('change-animation-status-0', changeAnimationStatus);

    return () => window.removeEventListener('change-animation-status-0', changeAnimationStatus);
  });

  useEffect(() => {
    const runAnimation = () => {
      callback(animation.getStart());
      frameId = requestAnimationFrame(runAnimation);

      if (animationStatus === 'stop') cancelAnimationFrame(frameId);
    };

    runAnimation();

    return () => cancelAnimationFrame(frameId);
  }, [animationStatus]);
}
