import { motion, useAnimation, Variant, Variants } from 'framer-motion';
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

const hoverAnimation: Variants = {
  initial: {
    x: 100,
    opacity: 0,
  },
  hover: {
    backgroundColor: 'pink',
    transition: {
      duration: 1,
    },
  },
};

const offsetYAnimation: Variant = {
  y: 150,
  backgroundColor: 'white',
  transition: {
    duration: 3,
  },
  opacity: 1,
};

export default function AsyncAnimation() {
  const controls = useAnimation();

  useEffect(() => {
    // controls.set(hoverAnimation);
    mock(2000).then(() => {
      controls.start(delayAnimation);
      controls.start(offsetYAnimation);
    });
  }, []);

  return (
    <>
      <motion.div
        variants={hoverAnimation}
        initial='initial'
        animate={controls}
        whileHover='hover'
        className='h-16 w-16 rounded-full bg-slate-300'
      />
      <motion.div
        initial='initial'
        animate={controls}
        whileHover='hover'
        className='h-16 w-16 rounded-full bg-slate-300'
      />
      123
    </>
  );
}
