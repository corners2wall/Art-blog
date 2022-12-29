import { Variants, motion, useAnimationControls } from 'framer-motion';
import Terminal from './Terminal';
import peopleAnimation from '../assets/peopleAnimation.gif';
import { ReactNode } from 'react';
import { useSubscribe } from '../utils/EventBus';
import { HOVER_NAVIGATOR } from '../utils/chanelName';

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
  text: {
    color: [null, 'white'],
    opacity: [null, 0.2, 0.4, 0.6, 0.8, 1],
    transition: {
      delay: 2.8,
      duration: 0.6,
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
      delay: 2.2,
      duration: 1.3,
    },
  },
};

const verticalAnimation: Variants = {
  initial: {
    flex: 0,
  },
  animate: (i) => ({
    flex: [null, 0, i],
    transition: {
      duration: 2.5,
    },
  }),
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

interface AnimateRowProps {
  className?: string;
  children: ReactNode;
  flexBasis?: number;
}

function AnimateRow({ className = '', children, flexBasis }: AnimateRowProps) {
  return (
    <motion.div
      layout
      className={`flex justify-center w-full ${className}`}
      variants={verticalAnimation}
      custom={flexBasis}
      initial='initial'
      animate={['animate', 'text']}
    >
      {children}
    </motion.div>
  );
}

interface AnimateCharProps {
  char: ReactNode;
  visibleDelay: number;
}

function AnimateChar({ char, visibleDelay }: AnimateCharProps) {
  return (
    <motion.span custom={visibleDelay} variants={charVariant} animate='animate' initial='initial'>
      {char}
    </motion.span>
  );
}

interface AnimationSpacerProps {
  children: ReactNode;
  className?: string;
}

function AnimationSpacer({ children, className = '' }: AnimationSpacerProps) {
  return (
    <motion.div
      variants={horizontalAnimation}
      initial='initial'
      animate={['animate', 'text']}
      className={`flex ${className}`}
    >
      {children}
    </motion.div>
  );
}

const marginAnimation: Variants = {
  base: {
    marginTop: 0,
    transition: {
      delay: 1.25,
      duration: 0.5,
    },
  },
  margin: {
    marginTop: '3rem',
    transition: {
      duration: 0.5,
    },
  },
};

export default function Preview() {
  const controls = useAnimationControls();

  useSubscribe(HOVER_NAVIGATOR, ([hover]) => {
    controls.start(hover ? 'margin' : 'base');
  });

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
      <AnimateRow flexBasis={1}>
        <motion.div
          className='flex flex-auto justify-center'
          variants={marginAnimation}
          animate={controls}
        >
          <AnimationSpacer className='justify-between'>
            <AnimateChar char='T' visibleDelay={0.2} />
            <AnimateChar char='2' visibleDelay={0.4} />
          </AnimationSpacer>
        </motion.div>
      </AnimateRow>
      <AnimateRow>
        <motion.div
          custom={2.5}
          variants={charVariant}
          className='flex self-center'
          animate='animate'
          initial='initial'
        >
          <motion.img src={peopleAnimation} className='w-24' />
        </motion.div>
        {/* <AnimateChar char={<img src={peopleAnimation} className='w-24' />} visibleDelay={2.5} /> */}

        <AnimationSpacer className='justify-end'>
          <AnimateChar char='7' visibleDelay={0.6} />
        </AnimationSpacer>
      </AnimateRow>
      <div className='absolute top-[45%] translate-y-[-50%] text-xs w-3/5'>
        <Terminal />
      </div>
    </motion.div>
  );
}
