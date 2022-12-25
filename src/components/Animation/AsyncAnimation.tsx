import { motion, useAnimation, Variant } from 'framer-motion';
import { useEffect } from 'react';

function mock(time: number, passedValue = {}, success = true) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (success) {
        resolve(passedValue);
      }

      reject({ message: 'Error' });
    }, time);
  });
}

const delayAnimation: Variant = {
  x: 450,
  backgroundColor: 'white',
  transition: {
    duration: 3,
  },
  opacity: 1,
};

export default function AsyncAnimation() {
  const controls = useAnimation();

  useEffect(() => {
    mock(2000).then(() => controls.start(delayAnimation));
  }, []);

  return (
    <motion.div
      initial={{ x: 100, opacity: 0 }}
      animate={controls}
      className='h-16 w-16 rounded-full'
    />
  );
}
