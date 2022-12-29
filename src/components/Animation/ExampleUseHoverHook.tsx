import { motion, useAnimation, Variants } from 'framer-motion';
import { useEffect } from 'react';
import useHover from '../../hooks/useHover';

const sample: Variants = {
  animate: {
    x: 100,
    transition: {
      duration: 1,
    },
  },
};

const colorSample: Variants = {
  initial: {
    opacity: 0,
    color: 'black',
    marginBottom: 0,
  },
  animate: {
    opacity: 1,
    color: 'pink',
    marginBottom: 20,
    transition: {
      delay: 1,
      duration: 0.5,
    },
  },
};

export default function ExampleUseHoverHook() {
  // const
  const { ref, isHover } = useHover<HTMLDivElement>();

  const controls = useAnimation();

  useEffect(() => {
    controls.set('animate');

    if (isHover) {
      debugger;
      controls.start(sample);
      controls.start('animate');
    }
  }, [isHover]);

  console.log(isHover);

  return (
    <div className='flex flex-col bg-white'>
      <motion.div className='w-96 h-96 bg-white border border-black' ref={ref} animate={controls}>
        <h1>aboba</h1>
      </motion.div>
      {isHover && <span>HOVER</span>}
      <motion.div
        variants={colorSample}
        initial='initial'
        animate={controls}
        className='w-16 h-16 bg-slate-500'
      ></motion.div>
    </div>
  );
}
