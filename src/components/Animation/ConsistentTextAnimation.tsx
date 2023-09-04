import { motion, Variants } from 'framer-motion';

const charAnimation: Variants = {
  animate: {
    opacity: [0, 1],
    visibility: ['hidden', 'visible'],
    transition: {
      duration: 0.15,
    },
  },
};

export const delayAnimationBeforeChildren: Variants = {
  animate: (i) => ({
    opacity: [0, 1],
    transition: {
      delay: i,
      when: 'beforeChildren',
      staggerChildren: 0.1,
    },
  }),
};

interface ConsistentTextAnimationProps {
  text: string;
  delay?: number;
}

export default function ConsistentTextAnimation({ text, delay }: ConsistentTextAnimationProps) {
  const chars = text.split('');

  return (
    <motion.div
      variants={delayAnimationBeforeChildren}
      custom={delay}
      animate='animate'
      className='inline-block'
    >
      {chars.map((char, index) => (
        <motion.span variants={charAnimation} key={index}>
          {char}
        </motion.span>
      ))}
    </motion.div>
  );
}
