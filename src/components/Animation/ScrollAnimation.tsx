import { motion, Variants } from 'framer-motion';

const variants: Variants = {
  initial: {
    visibility: 'hidden',
    opacity: 0,
  },
  view: {
    visibility: 'visible',
    opacity: 1,
    transition: {
      duration: 1.9,
    },
  },
};
export default function ScrollAnimation() {
  return (
    <motion.div
      variants={variants}
      initial='initial'
      animate='animate'
      whileInView='view'
      viewport={{ amount: 0.8 }}
      //   viewport={{ once: true }}
      className='w-16 h-16 bg-slate-200'
    />
  );
}
