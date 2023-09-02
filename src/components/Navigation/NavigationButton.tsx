import { motion, Variants } from 'framer-motion';

const offsetButtonAnimation: Variants = {
  initial: {
    x: -10,
  },
  hover: {
    x: 0,
    transition: {
      duration: 0.2,
    },
  },
};

const ArrowAnimation: Variants = {
  initial: {
    opacity: 0,
  },
  hover: {
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
      variants={offsetButtonAnimation}
      initial='initial'
      whileHover='hover'
    >
      <motion.span variants={ArrowAnimation}>&#x2794;</motion.span>
      {label}
    </motion.button>
  );
}
