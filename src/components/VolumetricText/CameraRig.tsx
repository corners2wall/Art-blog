import { useFrame } from '@react-three/fiber';
import { useState, useEffect } from 'react';
import { Vector3 } from 'three';

export function CameraRig() {
  const endZPosition = 500;
  const [isCameraAnimationStarted, setIsCameraAnimationStarted] = useState(false);

  useFrame(({ camera }) => {
    if (isCameraAnimationStarted) {
      const { x, y } = camera.position;
      camera.position.lerp(new Vector3(x, y, endZPosition), 0.1);
    }

    if (Math.round(camera.position.z) === endZPosition) setIsCameraAnimationStarted(false);
  });

  useEffect(() => {
    const timerId = setTimeout(() => setIsCameraAnimationStarted(true), 2500);

    return () => clearTimeout(timerId);
  }, []);

  return null;
}
