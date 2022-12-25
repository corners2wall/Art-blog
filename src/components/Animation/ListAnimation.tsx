import { motion, AnimatePresence, Variants } from 'framer-motion';
import { useState } from 'react';

const variants: Variants = {
  initial: {
    x: -512,
  },
  animate: {
    x: [null, 0],
    transition: {
      duration: 1,
    },
  },
  exit: {
    x: -512,
    transition: {
      duration: 1,
    },
  },
};

const wrapperVariants: Variants = {
  animate: {
    x: [null, 800],
    transition: {
      duration: 1,
      when: 'beforeChildren',
      staggerChildren: 1,
    },
  },
};

export default function ListAnimation() {
  const [items, setItems] = useState([1, 2, 3, 4, 5]);

  const addItem = () => setItems(items.concat([new Date().valueOf()]));

  const deleteItem = () => setItems(items.slice(0, -1));

  return (
    <div className='flex flex-col'>
      <div className='flex'>
        <button onClick={addItem} className='color-white bg-slate-100 rounded-md px-5 py-2 ml-2'>
          Add Item
        </button>
        <button onClick={deleteItem} className='color-white bg-slate-100 rounded-md px-5 py-2 ml-2'>
          Delete Item
        </button>
      </div>
      <motion.div
        className='w-[512px] h-[512px] border border-white overflow overflow-y-auto bg-white'
        variants={wrapperVariants}
        initial='initial'
        animate='animate'
      >
        <AnimatePresence>
          {items.map((item) => (
            <motion.div
              className='rounded-md border-black  p-4 text-black border m-1'
              variants={variants}
              key={item}
              exit={{
                x: -512,
                transition: {
                  duration: 1,
                },
              }}
            >
              Lorem ipsum dolor sit amet {item}
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
