import { motion, Variants } from 'framer-motion';
import useHover from '../../hooks/useHover';
import { HOVER_NAVIGATOR } from '../../utils/chanelName';
import { useEmitEvent } from '../../utils/EventBus';
import NavigationButton from './NavigationButton';

const showNavigationByHover: Variants = {
  hover: {
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
  animate: {
    y: '-100%',
    transition: {
      delay: 1.25,
      duration: 0.5,
    },
  },
};

export default function Navigation() {
  const { ref, isHover } = useHover<HTMLDivElement>();

  useEmitEvent(HOVER_NAVIGATOR, [isHover], isHover);

  return (
    <motion.div
      className='top-0 z-10 fixed'
      whileHover='hover'
      animate='animate'
      initial='initial'
      ref={ref}
    >
      <motion.nav
        layout
        variants={showNavigationByHover}
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
