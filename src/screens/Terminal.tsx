import { Variants, motion } from 'framer-motion';
import { useState } from 'react';
import ConsistentTextAnimation, {
  WrapperVariants,
} from '../components/Animation/ConsistentTextAnimation';
import CityTime from '../components/CityTime/CityTime';
import { OPEN_TERMINAL } from '../utils/chanelName';
import { useEmitEvent } from '../utils/EventBus';

const arrowAnimationOnHover: Variants = {
  initial: {
    x: -12,
  },
  hover: {
    x: 0,
    transition: {
      duration: 0.3,
    },
  },
};

function getDelayAnimation(delay: number): WrapperVariants {
  return {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        delay,
        when: 'beforeChildren',
        staggerChildren: 0.1,
      },
    },
  };
}

export default function Terminal() {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  const openTerminal = () => setIsTerminalOpen(true);

  useEmitEvent(OPEN_TERMINAL, [isTerminalOpen], isTerminalOpen);

  return (
    <motion.div
      className='
      absolute top-[45%] translate-y-[-50%] w-3/5 
      pt-20 text-white text-sm flex justify-around'
      animate='animate'
      initial='initial'
    >
      <motion.div custom={4} variants={getDelayAnimation(3.5)} className='flex flex-col'>
        <CityTime city='LA' />
        <CityTime city='TYO' />
      </motion.div>
      <ConsistentTextAnimation
        text='THINKING ABOUT THE FUTURE...'
        wrapperAnimation={getDelayAnimation(4.5)}
      />
      <motion.div
        className='flex flex-col overflow-hidden leading-none text-xs cursor-pointer'
        onClick={openTerminal}
      >
        <ConsistentTextAnimation text='ENTER' wrapperAnimation={getDelayAnimation(4)} />
        <motion.div variants={arrowAnimationOnHover} initial='initial' whileHover='hover'>
          <span>-{'>'}</span>
          <div className='inline-block'>
            <ConsistentTextAnimation text='TERMINAL™' wrapperAnimation={getDelayAnimation(4.5)} />
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
