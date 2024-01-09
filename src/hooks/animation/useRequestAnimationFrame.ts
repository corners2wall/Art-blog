import { useEffect, useState } from 'react';

// I need state for animation
// when parent animation will pause
// I should stop this animation too

// Maybe dispatch custom event
// and related animation should be subscribe on this event

// ToDo googling why we need store value in ref.current instance of variable

export default function useRequestAnimationFrame(callback: () => void, animationState: any) {
  let frameId = 0;

  // should be hold boolean or enum
  // enum
  const [animationStatus, setAnimationStatus] = useState(animationState.status);
  // con
  // check previous status and current
  const changeAnimationStatus = (status: any) => {
    if (animationStatus !== status.detail.status) setAnimationStatus(status.detail.status);
  };

  useEffect(() => {
    // ToDo make it event with uniq animation id
    window.addEventListener('change-animation-status', changeAnimationStatus);

    return () => window.removeEventListener('change-animation-status', changeAnimationStatus);
  });

  useEffect(() => {
    const runAnimation = () => {
      callback();
      frameId = requestAnimationFrame(runAnimation);

      if (animationStatus === 'stop') cancelAnimationFrame(frameId);
    };

    runAnimation();

    return () => cancelAnimationFrame(frameId);
  }, [animationStatus]);
}
