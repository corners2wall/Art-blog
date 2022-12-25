import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export default function Animation() {
  const [items, setItems] = useState([1, 2, 3, 4, 5]);
  const [hasItem, setHasItem] = useState(true);

  const addItem = () => setItems(items.concat([new Date().valueOf()]));

  const deleteItem = () => setItems(items.slice(0, -1));

  const toggleItem = () => setHasItem(!hasItem);

  return (
    <div className='flex flex-col'>
      <div className='flex'>
        <button onClick={addItem} className='color-white bg-slate-100 rounded-md px-5 py-2 ml-2'>
          Add Item
        </button>
        <button onClick={deleteItem} className='color-white bg-slate-100 rounded-md px-5 py-2 ml-2'>
          Delete Item
        </button>
        <button onClick={toggleItem} className='color-white bg-slate-100 rounded-md px-5 py-2 ml-2'>
          Toggle
        </button>
        <AnimatePresence>
          {hasItem && (
            <motion.div
              className='rounded-md border-white p-4 text-white border m-1'
              initial={{ x: 200 }}
              animate={{ x: [null, 800] }}
              transition={{ duration: 3 }}
              exit={{ x: [null, 200] }}
            >
              Lorem ipsum dolor sit amet
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <AnimatePresence>
        {items.map((item) => (
          <motion.div
            className='rounded-md border-white p-4 text-white border m-1'
            initial={{ x: 200 }}
            animate={{ x: [null, 250, 800] }}
            // transition={{ duration: 3 }}
            exit={{ x: 1000 }}
            key={item}
          >
            Lorem ipsum dolor sit amet {item}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
