import { motion, useAnimationControls, Variants } from 'framer-motion';
import { useEffect, useState } from 'react';
import useHover from '../../hooks/useHover';
import { HOVER_NAVIGATION, OPEN_TERMINAL } from '../../utils/chanelName';
import { useEmitEvent, useSubscribe } from '../../utils/EventBus';
import NavigationButton from './NavigationButton';

const showNavigationByHover: Variants = {
  hover: {
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
  hiddenAnimation: {
    y: '-100%',
    transition: {
      duration: 0.5,
    },
  },
  initialAnimate: {
    y: '-100%',
    transition: {
      delay: 1.5,
      duration: 0.5,
    },
  },
};

export default function Navigation() {
  const { ref, isHover } = useHover<HTMLDivElement>();

  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  const controls = useAnimationControls();

  useSubscribe(
    OPEN_TERMINAL,
    ([isOpen]) => {
      setIsTerminalOpen(isOpen);
      isOpen && controls.start('hover');
    },
    [isTerminalOpen]
  );

  useSubscribe(
    HOVER_NAVIGATION,
    ([hover]) => {
      if (!isTerminalOpen) controls.start(hover ? 'hover' : 'hiddenAnimation');
    },
    [isTerminalOpen]
  );

  useEmitEvent(HOVER_NAVIGATION, [isHover, isTerminalOpen], isTerminalOpen || isHover);

  useEffect(() => {
    controls.start('initialAnimate');
  }, []);

  return (
    <motion.div className='top-0 z-10 fixed' ref={ref}>
      <motion.nav
        variants={showNavigationByHover}
        animate={controls}
        className='h-12 w-screen bg-white border flex items-center justify-between px-5'
      >
        <h2 className='text-xl'>TERMINAL™</h2>
        <div>
          <NavigationButton label='SHOP' />
          <NavigationButton label='EVENTS' />
          <NavigationButton label='GALLERY' />
          <NavigationButton label='EDITORIAL' />
        </div>

        <div>
          <NavigationButton label='SEARCH' />
          <NavigationButton label='DISCORD' />
          <NavigationButton label='LOGIN' />
          <NavigationButton label='CARD' />
        </div>
      </motion.nav>
    </motion.div>
  );
}
