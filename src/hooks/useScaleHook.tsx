import { useEffect, useRef } from 'react';

export default function useScaleHook<T extends HTMLElement>(scale = 1, pointX = 0, pointY = 0) {
  const scalableNode = useRef<T>(null);
  const onWheel = configureWheelCallback(scale, pointX, pointY);

  useEffect(() => {
    if (scalableNode.current) {
      scalableNode.current.addEventListener('wheel', onWheel);
    }

    return () => scalableNode.current?.removeEventListener('wheel', onWheel);
  }, [scalableNode.current]);

  return scalableNode;
}

function getTransform(x: number, y: number, scale: number) {
  return `translateX(${x}px) translateY(${y}px) scale(${scale},${scale})`;
}

function configureWheelCallback(scale = 1, pointX = 0, pointY = 0) {
  return function onWheel(this: HTMLElement, event: WheelEvent) {
    const xs = (event.clientX - pointX) / scale;
    const ys = (event.clientY - pointY) / scale;

    scale = event.deltaY < 0 ? scale * 1.2 : scale / 1.2;

    pointX = event.clientX - xs * scale;
    pointY = event.clientY - ys * scale;
    console.log(this);
    this.style.transform = getTransform(pointX, pointY, scale);
  };
}
