import { motion, Variant, Variants } from 'framer-motion';

const variants: Variants = {
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

const wrapperVariants: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export type WrapperVariants = Record<'animate' | 'initial', Variant>; //{ animate: Variant; initial: Variant };

interface ConsistentTextAnimationProps {
  text: string;
  wrapperAnimation: WrapperVariants;
}

export default function ConsistentTextAnimation({
  text,
  wrapperAnimation,
}: ConsistentTextAnimationProps) {
  const chars = text.split('');

  return (
    <motion.div variants={wrapperAnimation} animate='animate' initial='initial'>
      {chars.map((char) => (
        <motion.span className='text-white' variants={variants} key={char}>
          {char}
        </motion.span>
      ))}
    </motion.div>
  );
}
