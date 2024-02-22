import { motion, Variants } from 'framer-motion';
import { PropsWithChildren } from 'react';

interface AnimateButtonProps extends PropsWithChildren {
  variant: 'dark' | 'light';
  className?: string;
}

export default function AnimateButton({ variant, className, children }: AnimateButtonProps) {
  const color = variant === 'dark' ? 'bg-olive-900' : 'bg-olive-100';

  return (
    <motion.div whileHover='hover' initial='initial' className={`overflow-hidden ${className}`}>
      <button className='text-4xl cursor-pointer uppercase'>{children}</button>
      <motion.div variants={arrowMotion} className={`h-[2px] w-full ${color}`} />
    </motion.div>
  );
}

const arrowMotion: Variants = {
  initial: {
    x: 0,
    transition: {
      duration: 0.3,
      ease: 'easeIn',
    },
  },
  hover: {
    x: '100%',
    transition: {
      duration: 0.3,
      ease: 'easeIn',
    },
  },
};
