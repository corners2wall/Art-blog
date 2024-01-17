import { Variants, motion } from 'framer-motion';
import Text from '../../components/Text';

/// shadow opacity = 0.65 -> 0.95
/// image translateY => -20 -> 0

export default function ParallaxSection() {
  return (
    <section className='pt-60 pb-24 flex items-center justify-center relative overflow-hidden'>
      <div className='absolute h-[115%] w-[115%]'>
        <img src='images/greenFlex.jpg' className='w-full h-full object-cover' />
        <div className='opacity-80 bg-black bg-opacity-60 absolute h-full w-full z-10 top-0' />
      </div>
      <div className='z-10 w-full flex flex-col items-center'>
        <div className='w-2/3 text-center'>
          <Text variant='medium-title'>
            OFFERING CREATIVE-LED DESIGN AND DEVELOPMENT FOR AMBITIOUS BRANDS THAT WANT TO EXPAND
            AND CREATE
          </Text>
          <h2 className='font-blackstone text-[10rem] font-thin	pb-4 relative top-[-5rem]'>
            lasting change
          </h2>
        </div>
        <div
          className='h-[1px] mt-52 mb-60 w-11/12'
          style={{ background: 'rgba(191, 234, 136, .12)' }}
        />
        <div className='flex w-10/12 justify-between mb-80'>
          <motion.div className='flex flex-col relative'>
            <motion.img
              src='svg/SCoin.svg'
              custom={1}
              variants={headsVariant}
              initial='initial'
              animate='animate'
            />
            <motion.img
              src='svg/FCoin.svg'
              custom={0}
              className='absolute'
              variants={tailsVariant}
              initial='initial'
              animate='animate'
            />
          </motion.div>
          <div className='flex gap-20'>
            <div className='w-[22vw]'>
              <Text variant='medium'>DIGITAL FIRST BRANDING</Text>
              <div className='flex flex-col mt-3 gap-2'>
                <Text variant='small-bold'>RESEARCH + EXPLORATION</Text>
                <div className='h-[1px] w-full bg-olive-100' />
                <Text variant='small-bold'>BRAND NAMING</Text>
                <div className='h-[1px] w-full bg-olive-100' />
                <Text variant='small-bold'>BRAND STRATEGY</Text>
                <div className='h-[1px] w-full bg-olive-100' />
                <Text variant='small-bold'>BRAND IDENTITY & LOGO DESIGN</Text>
                <div className='h-[1px] w-full bg-olive-100' />
                <Text variant='small-bold'>REBRANDING</Text>
                <div className='h-[1px] w-full bg-olive-100' />
                <Text variant='small-bold'>BRAND GUARDIANSHIP</Text>
                <div className='h-[1px] w-full bg-olive-100' />
                <Text variant='small-bold'>AGENCY PARTNER</Text>
              </div>
            </div>
            <div className='w-[22vw]'>
              <Text variant='medium'>WEBSITES + COMMERCE</Text>
              <div className='flex flex-col mt-3 gap-2'>
                <Text variant='small-bold'>DIGITAL ART DIRECTION</Text>
                <div className='h-[1px] w-full bg-olive-100' />
                <Text variant='small-bold'>UI + UX DESIGN</Text>
                <div className='h-[1px] w-full bg-olive-100' />
                <Text variant='small-bold'>MOTION, ANIMATION + INTERACTION</Text>
                <div className='h-[1px] w-full bg-olive-100' />
                <Text variant='small-bold'>CREATIVE WEBFLOW DEVELOPMENT</Text>
                <div className='h-[1px] w-full bg-olive-100' />
                <Text variant='small-bold'>MOTION, ANIMATION & INTERACTION</Text>
                <div className='h-[1px] w-full bg-olive-100' />
                <Text variant='small-bold'>WEBGL + 3D DESIGN</Text>
                <div className='h-[1px] w-full bg-olive-100' />
                <Text variant='small-bold'>AGENCY PARTNER</Text>
              </div>
            </div>
          </div>
        </div>
        <div className='flex gap-2 items-center'>
          <Text variant='medium-bold'>WORKING</Text>
          <Text variant='small'>WITH</Text>
          <Text variant='medium-bold'>PASSIONATE PEOPLE</Text>
          <Text variant='small'>&</Text>
          <Text variant='medium-bold'>AMBITIOUS BRANDS</Text>
          <Text variant='small'>TO CREATE</Text>
        </div>
        <div className='flex gap-2 items-center'>
          <Text variant='small'>MEMORABLE</Text>
          <Text variant='medium-bold'>BRANDS</Text>
          <Text variant='small'>& CAPTIVATING</Text>
          <Text variant='medium-bold'>DIGITAL EXPERIENCES</Text>
          <Text variant='small'>THAT DELIVER</Text>
          <Text variant='medium-bold'>RESULTS</Text>
        </div>
      </div>
    </section>
  );
}

const headsVariant: Variants = {
  initial: {
    rotateY: 90,
    opacity: 1,
  },
  animate: {
    rotateY: [90, 90, 360, 360, 450, 450, 450],
    opacity: [0, 1, 1, 1, 1, 0.9, 0.9],
    transition: {
      duration: 5.5,
      repeat: Infinity,
      times: [0, 0.05, 0.1, 0.5, 0.55, 0.65, 1],
    },
  },
};

const tailsVariant: Variants = {
  initial: {
    rotateY: 90,
    opacity: 0,
  },
  animate: {
    rotateY: [0, 90, 360, 360, 450, 450, 450],
    opacity: [0, 1, 1, 1, 1, 0.9, 0.9],
    transition: {
      delay: 2.75,
      duration: 5.5,
      repeat: Infinity,
      times: [0, 0.05, 0.1, 0.5, 0.55, 0.65, 1],
    },
  },
};
