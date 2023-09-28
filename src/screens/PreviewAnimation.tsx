import { AnimationProps, Variants, motion, useAnimationControls } from 'framer-motion';
import { useEffect, PropsWithChildren } from 'react';
import { ReactNode } from 'react';
import { useSubscribe } from '../utils/EventBus';
import { HOVER_NAVIGATION } from '../utils/chanelName';
import getImageUrl from '../utils/getImageUrl';

const peopleAnimationSrc = getImageUrl('peopleAnimation', 'gif');

const rowAnimation: Variants = {
  animate: (i) => ({
    flex: [0, i],
    transition: {
      duration: 2.5,
    },
  }),
};

const marginAnimation: Variants = {
  initial: {
    marginTop: 0,
    transition: {
      duration: 0.5,
    },
  },
  onHover: {
    marginTop: '3rem',
    transition: {
      duration: 0.5,
    },
  },
};

interface AnimateRowProps extends Pick<AnimationProps, 'animate' | 'variants'> {
  children: ReactNode;
  flexBasis?: number;
}

function AnimateRow({ children, flexBasis, animate = 'animate', variants }: AnimateRowProps) {
  return (
    <motion.div
      layout
      className='flex justify-center w-full'
      variants={{ ...rowAnimation, ...variants }}
      custom={flexBasis}
      initial='initial'
      animate={animate}
    >
      {children}
    </motion.div>
  );
}

const itemAnimation: Variants = {
  animate: (i) => ({
    opacity: [0, 1],
    transition: {
      delay: i,
    },
  }),
};

interface AnimateItemProps {
  children: ReactNode;
  visibleDelay: number;
}

function AnimateItem({ children, visibleDelay }: AnimateItemProps) {
  return (
    <motion.div
      custom={visibleDelay}
      variants={itemAnimation}
      animate='animate'
      initial='initial'
      className='text-[10rem] min-w-[1rem]'
    >
      {children}
    </motion.div>
  );
}

interface AnimationSpacerProps {
  children: ReactNode;
}

const horizontalAnimation: Variants = {
  animate: {
    flex: [0, 1],
    transition: {
      delay: 2,
      duration: 1.5,
    },
  },
  textAnimate: {
    color: ['black', 'white'],
    opacity: [1, 0.2, 0.4, 0.6, 0.8, 1],
    transition: {
      delay: 2.8,
      duration: 0.6,
    },
  },
};

function AnimationSpacer({ children }: AnimationSpacerProps) {
  return (
    <motion.div
      variants={horizontalAnimation}
      initial='initial'
      animate={['animate', 'textAnimate']}
      className={`flex justify-between`}
    >
      {children}
    </motion.div>
  );
}

const backgroundAnimation: Variants = {
  animate: {
    color: ['white', 'black'],
    backgroundSize: ['0% 100%', '100% 100%'],
    transition: {
      delay: 2.2,
      duration: 1.3,
    },
  },
};

function AnimationWrapper({ children }: PropsWithChildren) {
  return (
    <motion.div
      variants={backgroundAnimation}
      animate='animate'
      className='
        sticky top-0
        w-full min-h-screen max-h-screen bg-white px-7 leading-none
        flex flex-col basis-[100%] items-center justify-center
        bg-gradient-to-r from-black to-black bg-no-repeat bg-center
        '
    >
      {children}
    </motion.div>
  );
}

export default function PreviewAnimation({ children }: PropsWithChildren) {
  const controls = useAnimationControls();

  useSubscribe(HOVER_NAVIGATION, ([hover]) => controls.start(hover ? 'onHover' : 'initial'));

  useEffect(() => {
    controls.start('animate');
  }, []);

  return (
    <AnimationWrapper>
      <AnimateRow flexBasis={1} animate={controls} variants={marginAnimation}>
        <AnimationSpacer>
          <AnimateItem visibleDelay={0.2}>A </AnimateItem>
          <AnimateItem visibleDelay={0.4}>R </AnimateItem>
        </AnimationSpacer>
      </AnimateRow>
      <AnimateRow>
        <AnimationSpacer>
          <AnimateItem visibleDelay={2.5}>
            <img src={peopleAnimationSrc} className='w-1/2' />
          </AnimateItem>
          <AnimateItem visibleDelay={0.6}>T </AnimateItem>
        </AnimationSpacer>
      </AnimateRow>
      {children}
    </AnimationWrapper>
  );
}
