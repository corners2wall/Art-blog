import { Variants, motion, useAnimationControls } from 'framer-motion';
import { OPEN_TERMINAL } from '../utils/chanelName';
import { useSubscribe } from '../utils/EventBus';

const expandAnimation: Variants = {
  initial: {
    overflow: 'hidden',
    flexBasis: 0,
  },
  animate: {
    flexBasis: '100%',
    transition: {
      duration: 1,
    },
  },
};

const contentAnimation: Variants = {
  initial: {
    x: '100%',
  },
  animate: {
    x: 0,
    transition: {
      duration: 1,
    },
  },
};

export default function Content() {
  const controls = useAnimationControls();

  useSubscribe(OPEN_TERMINAL, ([isOpen]) => isOpen && controls.start('animate'));

  return (
    <motion.div
      className='text-black bg-white'
      variants={expandAnimation}
      initial='initial'
      animate={controls}
    >
      <motion.div variants={contentAnimation} animate={controls}>
        123
      </motion.div>
    </motion.div>
  );
}
