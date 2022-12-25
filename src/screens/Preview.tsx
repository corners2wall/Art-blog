import { Variants, motion } from 'framer-motion';
import Terminal from './Terminal';
import peopleAnimation from '../assets/peopleAnimation.gif';

const horizontalAnimation: Variants = {
  initial: {
    flex: 0,
  },
  animate: {
    flex: 1,
    transition: {
      delay: 2,
      duration: 1.5,
    },
  },
};

const backgroundAnimation: Variants = {
  initial: {
    backgroundSize: '0% 100%',
  },
  animate: {
    color: [null, 'black'],
    backgroundSize: [null, '100% 100%'],
    transition: {
      delay: 2.1,
      duration: 1.4,
    },
  },
};

const textOpacityAnimation: Variants = {
  animate: {
    color: [null, 'white'],
    opacity: [null, 0.2, 0.4, 0.6, 0.8, 1],
    transition: {
      delay: 2.8,
      duration: 0.6,
    },
  },
};

const verticalAnimation: Variants = {
  initial: {
    flex: 0,
    width: '100%',
  },
  animate: {
    flex: [null, 0, 1],
    transition: {
      duration: 2,
    },
  },
  text: {
    color: [null, 'white'],
    opacity: [null, 0.2, 0.4, 0.6, 0.8, 1],
    transition: {
      delay: 2.8,
      duration: 0.6,
    },
  },
};

const charVariant: Variants = {
  initial: {
    opacity: 0,
  },
  animate: (i) => ({
    opacity: 1,
    transition: {
      delay: i,
    },
  }),
};

export default function Preview() {
  return (
    <motion.div
      variants={backgroundAnimation}
      initial='initial'
      animate='animate'
      className='
          relative w-full min-h-screen bg-white text-[200px] px-7 leading-none
          items-center justify-center flex flex-col 
          bg-gradient-to-r from-black to-black bg-no-repeat bg-center
        '
    >
      <motion.div
        layout
        className='flex justify-center'
        variants={verticalAnimation}
        initial='initial'
        animate={['animate', 'text']}
      >
        <motion.span custom={0.2} variants={charVariant}>
          T
        </motion.span>
        <motion.div className='flex' variants={horizontalAnimation} />
        <motion.span custom={0.4} variants={charVariant}>
          2
        </motion.span>
      </motion.div>
      <motion.div className='flex justify-center w-full' variants={textOpacityAnimation}>
        <motion.div custom={2.5} variants={charVariant} className='self-center'>
          <img src={peopleAnimation} className='w-24' />
        </motion.div>
        <motion.div className='flex' variants={horizontalAnimation} />
        <motion.span custom={0.6} variants={charVariant}>
          7
        </motion.span>
      </motion.div>
      <div className='absolute top-[45%] translate-y-[-50%] text-xs w-3/5'>
        <Terminal />
      </div>
    </motion.div>
  );
}
