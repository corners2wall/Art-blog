import { motion, Variant, Variants } from 'framer-motion';
import Text from '../../components/Text';

export default function Footer() {
  return (
    <footer className='pt-[1vh] pb-[3vh] px-[4vh] flex flex-col bg-[#142120] h-screen justify-between'>
      <div className='flex flex-col items-center'>
        <Text variant='extra-large'>LET'S COLLABORATE</Text>
        <Text variant='medium' className='mb-[2vh]'>
          AUTHENTIC TALES OF HUMAN SPIRIT
        </Text>
        <h3 className='font-blackstone text-5xl'>by Somefolk</h3>
      </div>
      <div className='flex justify-between w-full items-end'>
        <div
          className='
        relative
        flex flex-col justify-between
        text-olive-900 bg-olive-100 
        py-[1vw] pl-[1vw] pr-[8vw] 
        uppercase min-h-[26vh] w-2/5 border-md rounded
        '
        >
          <Text variant='medium'>
            if you’ve got a story that needs to be told, please get in touch!
          </Text>
          <p className='font-editorial text-[0.7vw]'>I can't wait to hear from you</p>
          <motion.div
            whileHover='hover'
            initial='initial'
            className='absolute bottom-4 right-4 overflow-hidden'
          >
            <div className='text-3xl cursor-pointer'>Copy email address</div>
            <motion.div variants={arrowMotion} className='h-[2px] w-full bg-olive-900' />
          </motion.div>
        </div>
        <div className='relative'>
          <div
            className={`absolute -top-[45vh] bg-[url('svg/flower.svg')] w-[40vh] h-[45vh] bg-no-repeat bg-contain bg-bottom`}
          />
        </div>
        <div className='flex flex-col items-center uppercase'>
          <div
            className={`bg-[url('svg/logo.svg')] w-[15vh] h-[15vh] bg-no-repeat bg-contain bg-bottom mb-4`}
          />
          <Text variant='small-bold' as='h6'>
            © somefolk® 2024
          </Text>
        </div>
      </div>
    </footer>
  );
}

const arrowMotion: Variants = {
  initial: {
    x: 0,
    transition: {
      duration: 0.3,
      ease: 'easeIn',
    },
  },
  hover: {
    x: '100%',
    transition: {
      duration: 0.3,
      ease: 'easeIn',
    },
  },
};
