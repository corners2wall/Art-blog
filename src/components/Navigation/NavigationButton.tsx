import { motion, Variants } from 'framer-motion';

const offsetAnimationByHover: Variants = {
  initial: {
    x: -10,
  },
  hoverNavigationButton: {
    x: 0,
    transition: {
      duration: 0.2,
    },
  },
};

const visibilityAnimationByHover: Variants = {
  initial: {
    opacity: 0,
  },
  hoverNavigationButton: {
    opacity: 1,
    transition: {
      duration: 0.4,
    },
  },
};

interface NavigationButtonProps {
  label: string;
  onClick?(): void;
}

export default function NavigationButton({ label, onClick }: NavigationButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      type='button'
      className='text-sm mx-2 overflow-hidden uppercase'
      variants={offsetAnimationByHover}
      initial='initial'
      whileHover='hoverNavigationButton'
    >
      <motion.span variants={visibilityAnimationByHover}>&#x2794;</motion.span>
      {label}
    </motion.button>
  );
}
