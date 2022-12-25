import { motion, AnimatePresence, Variants } from 'framer-motion';
import { useState } from 'react';

const variants: Variants = {
  initial: {
    x: 200,
  },
  animate: {
    x: [null, 800],
    transition: {
      duration: 3,
    },
  },
  exit: {
    x: [null, 200],
  },
  hover: {
    scale: 1.2,
    transition: { duration: 1 },
  },
};

export default function ToggleAnimation() {
  const [hasItem, setHasItem] = useState(true);

  const toggleItem = () => setHasItem(!hasItem);

  return (
    <div className='flex flex-col'>
      <div className='flex'>
        <button onClick={toggleItem} className='color-white bg-slate-100 rounded-md px-5 py-2 ml-2'>
          Toggle
        </button>
        <AnimatePresence>
          {hasItem && (
            <motion.div
              variants={variants}
              className='rounded-md border-white p-4 text-white border m-1'
              initial='initial'
              animate='animate'
              exit='exit'
              whileHover='hover'
            >
              Lorem ipsum dolor sit amet
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
