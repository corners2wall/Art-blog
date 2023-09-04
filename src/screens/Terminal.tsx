import { Variants, motion } from 'framer-motion';
import { useState } from 'react';
import ConsistentTextAnimation, {
  delayAnimationBeforeChildren,
} from '../components/Animation/ConsistentTextAnimation';
import CityTime from '../components/CityTime/CityTime';
import { useEmitEvent } from '../utils/EventBus';
import { OPEN_TERMINAL } from '../utils/chanelName';

const arrowAnimation: Variants = {
  initial: {
    x: -13,
  },
  hover: {
    x: 0,
    transition: {
      duration: 0.3,
    },
  },
};

export default function Terminal() {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  const openTerminal = () => setIsTerminalOpen(true);

  useEmitEvent(OPEN_TERMINAL, [isTerminalOpen], isTerminalOpen);

  return (
    <div
      className='
      absolute top-[50%] translate-y-[-50%] w-3/5 
       text-white text-sm
      flex justify-around'
    >
      <motion.div custom={4} variants={delayAnimationBeforeChildren} className='flex flex-col'>
        <CityTime city='LA' />
        <CityTime city='TYO' />
      </motion.div>
      <ConsistentTextAnimation text='THINKING ABOUT THE FUTURE...' delay={4.5} />
      <div
        className='flex flex-col overflow-hidden leading-none text-xs cursor-pointer'
        onClick={openTerminal}
      >
        <ConsistentTextAnimation text='ENTER' delay={4} />
        <motion.div variants={arrowAnimation} initial='initial' whileHover='hover'>
          <span>-{'>'}</span>
          <ConsistentTextAnimation text='TERMINAL™' delay={4.5} />
        </motion.div>
      </div>
    </div>
  );
}
