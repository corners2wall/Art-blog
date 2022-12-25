import { motion } from 'framer-motion';
import { useState } from 'react';

export default function Accordion() {
  const [isOpen, setOpen] = useState(false);

  return (
    <motion.div
      layout
      style={{ height: isOpen ? '100px' : '500px' }}
      onClick={() => setOpen(!isOpen)}
      className='w-16 border border-white'
    />
  );
}
