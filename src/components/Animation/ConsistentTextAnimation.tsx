import { motion, Variant, Variants } from 'framer-motion';

const charAnimation: Variants = {
  initial: {
    opacity: 0,
    visibility: 'hidden',
  },
  animate: {
    opacity: 1,
    visibility: 'visible',
    transition: {
      duration: 0.15,
    },
  },
};

export type WrapperVariants = Record<'animate' | 'initial', Variant>;

const defaultAnimation: WrapperVariants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

interface ConsistentTextAnimationProps {
  text: string;
  wrapperAnimation?: WrapperVariants;
}

export default function ConsistentTextAnimation({
  text,
  wrapperAnimation = defaultAnimation,
}: ConsistentTextAnimationProps) {
  const chars = text.split('');

  return (
    <motion.div variants={wrapperAnimation} animate='animate' initial='initial'>
      {chars.map((char, index) => (
        <motion.span variants={charAnimation} key={index}>
          {char}
        </motion.span>
      ))}
    </motion.div>
  );
}
