import { extend, Object3DNode, useThree, useFrame } from '@react-three/fiber';
import { useRef, useEffect } from 'react';
import OrbitControlImpl from './OrbitControlImpl';

extend({ OrbitControl: OrbitControlImpl });

declare module '@react-three/fiber' {
  interface ThreeElements {
    orbitControl: Object3DNode<OrbitControlImpl, typeof OrbitControlImpl>;
  }
}

export function OrbitControl() {
  const { camera, gl } = useThree();

  const orbitControlRef = useRef<OrbitControlImpl>(null);

  useFrame(() => orbitControlRef.current && orbitControlRef.current.update());

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      const x = -0.5 + (1 - e.clientX / gl.domElement.width);
      const y = -0.5 + e.clientY / gl.domElement.height;

      const event = {
        ...e,
        clientX: x * 30,
        clientY: y * 45,
      };

      if (orbitControlRef.current) orbitControlRef.current.handleMouseMoveRotate(event);
    };

    window.addEventListener('mousemove', onMouseMove);

    return () => window.removeEventListener('mousemove', onMouseMove);
  }, [camera, gl]);

  return (
    <orbitControl
      ref={orbitControlRef}
      args={[camera, gl.domElement]}
      enableDamping
      dampingFactor={0.005}
    />
  );
}
