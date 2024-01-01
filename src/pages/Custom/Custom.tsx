import getImageUrl from '../../utils/getImageUrl';
import { useState } from 'react';
import R3F from '../R3F';
import Tile from '../../components/Tile';
import Row from '../../components/Layouts/Row';
import { motion, Variants } from 'framer-motion';

const tileImage = getImageUrl('background', 'jpg');

const barcode = getImageUrl('barcode', 'svg');
const founded = getImageUrl('founded', 'svg');
const address = getImageUrl('address', 'svg');

// ref: https://www.somefolk.co.uk/
export default function Custom() {
  const [isModelsLoaded, setIsModelsLoaded] = useState(false);
  return (
    <div className='overflow-hidden bg-[#333333] relative w-screen h-screen'>
      {isModelsLoaded && (
        <>
          <Tile image={tileImage} />
          <Test />
        </>
      )}
      <div className='w-screen h-screen absolute top-0 left-0 '>
        <R3F setIsModelsLoaded={setIsModelsLoaded} />
      </div>
    </div>
  );
}

const offsetHover: Variants = {
  hover: {
    y: '-50%',
    transition: {
      delay: 0.05,
      duration: 0.2,
    },
  },
};

const barcodeAnimation: Variants = {
  initial: {},
  animate: {
    x: '-100%',
    transition: {
      ease: 'linear',
      duration: 10,
      repeat: Infinity,
    },
  },
};

const opacityAnimation: Variants = {
  initial: {
    opacity: 0,
  },
  animate: (delay) => ({
    opacity: 1,
    transition: {
      duration: 0.75,
      delay,
    },
  }),
};

function Test() {
  return (
    <div className='flex flex-col justify-between w-screen h-screen absolute top-0 left-0 text-[#bfea88] p-4 font-arges'>
      <motion.div
        className='flex justify-between text-lg font-normal'
        variants={opacityAnimation}
        custom={3.25}
        initial='initial'
        animate='animate'
      >
        <div>
          <span className='font-mori font-semibold text-base'>INSTAGRAM</span>
          <div className='font-black text-[9rem] overflow-hidden h-32 leading-none'>
            <motion.div
              className='flex flex-col'
              initial='initial'
              whileHover='hover'
              variants={offsetHover}
            >
              <span>INFO</span>
              <span>INFO</span>
            </motion.div>
          </div>
        </div>
        <span className='text-3xl font-semibold'>AVAILABLE IN 2024</span>
        <div className='flex flex-col items-end'>
          <span className='font-mori font-semibold text-base'>SAFE ANIMALS</span>
          <div className='font-black text-[9rem] overflow-hidden h-32 leading-none'>
            <motion.div
              className='flex flex-col'
              initial='initial'
              whileHover='hover'
              variants={offsetHover}
            >
              <span>WORK</span>
              <span>WORK</span>
            </motion.div>
          </div>
        </div>
      </motion.div>
      <motion.div
        variants={opacityAnimation}
        custom={3.75}
        initial='initial'
        animate='animate'
        className='flex justify-between items-end'
      >
        <div className='flex flex-col gap-4 w-fit'>
          <div className='flex gap-4 justify-between items-center'>
            <img src={founded} />
            <div className='overflow-hidden w-[8vw] h-fit'>
              <motion.div className='flex' variants={barcodeAnimation} animate='animate'>
                <img src={barcode} className='w-[9vw]' />
                <img src={barcode} className='w-[9vw]' />
                <img src={barcode} className='w-[9vw]' />
              </motion.div>
            </div>
          </div>
          <div>
            <img src={address} className='w-[15vw]' />
          </div>
        </div>
        <div className='flex flex-col items-center leading-none'>
          <span className='text-[1.7rem] font-bold pb-1'>WORKING ON PROJECTS FOR</span>
          <div className='flex gap-4 text-5xl font-black pb-2'>
            <span>BRAND</span>
            <span>DIRECTION</span>
            <span>DIGITAL</span>
          </div>
          <div>
            <div className='flex gap-2 tracking-wide items-center'>
              <span className='text-lg font-semibold tracking-tight font-mori'>COLLABORATING</span>
              <span className='text-base tracking-wide'>WITH</span>
              <span className='text-lg font-semibold tracking-tight font-mori'>
                AMBITIOUS BRANDS
              </span>
              <span className='text-base tracking-wide'>THAT HAVE</span>
              <span className='text-lg font-semibold tracking-tight font-mori'>
                POWERFUL STORIES
              </span>
              <span className='text-base tracking-wide'>TO TELL</span>
            </div>
            <div className='flex gap-2 tracking-wide items-center'>
              <span className='text-base tracking-wide'>I WORK</span>
              <span className='text-lg font-semibold tracking-tight font-mori'>INDEPENDENTLY</span>
              <span className='text-base tracking-wide'>AND WITH CREATIVE</span>
              <span className='text-lg font-semibold tracking-tight font-mori'>
                FREELANCERS, STUDIOS
              </span>
              <span className='text-base tracking-wide'>AND</span>
              <span className='text-lg font-semibold tracking-tight font-mori'>AGENCIES</span>
            </div>
          </div>
        </div>
        <div className='w-[20%]' />
      </motion.div>
    </div>
  );
}
