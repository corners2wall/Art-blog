import { useScroll, motion } from 'framer-motion';

export default function PageScroll() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className='fixed top-0 left-0 right-0 bg-white h-1 origin-[0%] z-10'
      style={{ scaleX: scrollYProgress }}
    />
  );
}
