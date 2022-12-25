import './App.css';
import Image1 from './assets/1.jpg';
import Image2 from './assets/2.jpg';
import Image3 from './assets/3.jpg';
import { ReactComponent as DoubleArrow } from './assets/doubleArrow.svg';
import Carousel from './components/Carousel/Carousel';
import Animation from './components/Animation';
import ToggleAnimation from './components/Animation/ToggleAnimation';
import ListAnimation from './components/Animation/ListAnimation';
import AsyncAnimation from './components/Animation/AsyncAnimation';
import Accordion from './components/Animation/Accordion';
import { LayoutGroup, Variants } from 'framer-motion';
import ScrollAnimation from './components/Animation/ScrollAnimation';
import PageScroll from './components/Animation/PageScroll';
import ConsistentTextAnimation from './components/Animation/ConsistentTextAnimation';
import { motion } from 'framer-motion';
import Terminal from './screens/Terminal';
import Preview from './screens/Preview';

const images = [Image1, Image2, Image3];

const variant: Variants = {
  initial: {
    // opacity: 0,
  },
  animate: {
    opacity: [0.1, 0.2, 1, 0.3, 0.4, 1],
    transition: {
      times: [0, 0.2, 0.3, 0.4, 0.6, 1],
      duration: 3,
    },
  },
};

function App() {
  return (
    <div className='min-h-screen flex flex-col bg-black'>
      {/* <div className='relative min-h-screen bg-black pt-20 text-white text-9xl'>
        <motion.span variants={variant} initial='initial' animate='animate'>
          S
        </motion.span>
      </div> */}
      {/* <div className='relative min-h-screen flex flex-col'>
        <Video />
        <div className='absolute min-h-screen w-full bg-black opacity-20'>
        <span className='absolute top-1/3 left-1/4 -rotate-12 text-purple-50 text-9xl'>
        SAMPLE
        </span>
        <span className='absolute top-1/2 left-1/3 -rotate-12 text-purple-50 text-9xl'>TEXT</span>
        </div>
      </div> */}
      {/* <div className='relative w-full min-h-screen bg-black pt-20'>
        <div className='flex min-w-[50%]'>
          <ToggleAnimation />
        </div>
      </div> */}
      {/* <div className='relative w-full min-h-screen bg-black pt-20'>
        <div className='flex min-w-[50%]'>
          <ScrollAnimation />
        </div>
      </div> */}
      {/* <motion.div
        className='relative w-full min-h-screen bg-black pt-20 test'
        variants={variant}
        initial='initial'
        animate='active'
      ></motion.div> */}
      {/* <motion.div
        variants={variant}
        initial='initial'
        animate='animate'
        className='w-full min-h-screen bg-black 
        bg-gradient-to-r from-white to-white bg-no-repeat bg-center'
      /> */}
      {/* <Terminal /> */}
      <Preview />

      <div className='relative w-full min-h-screen bg-black pt-20'>
        <PageScroll />
      </div>
      <div className='relative w-full min-h-screen bg-black pt-20'>
        <div className='flex min-w-[50%]'>
          <LayoutGroup>
            <Accordion />
            <Accordion />
          </LayoutGroup>
        </div>
      </div>
      <div className='relative w-full min-h-screen bg-black pt-20'>
        <div className='flex min-w-[50%]'>
          <ScrollAnimation />
        </div>
      </div>
      <div className='relative w-full min-h-screen bg-black pt-20'>
        <div className='flex min-w-[50%]'>
          <AsyncAnimation />
        </div>
      </div>
      <div className='relative w-full min-h-screen bg-black pt-20'>
        <div className='flex min-w-[50%]'>
          <ListAnimation />
        </div>
      </div>
      <div className='relative w-full min-h-screen bg-black flex justify-center items-center '>
        <div className='flex min-w-[50%]'>
          <Carousel images={images} />
        </div>
      </div>
      <div className='flex bg-black relative px-[20%]'>
        <div className='flex flex-1 flex-col text-white text-left px-3'>
          <span className='flex self-end text-4xl'> 01</span>
          <p className='py-2 tracking-wider text-justify'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime odit cum repellendus.
          </p>
          <button type='button' className='pl-1'>
            <DoubleArrow width={26} height={26} className='fill-white' />
          </button>
        </div>
        <div className='flex flex-1 flex-col text-white text-left px-3'>
          <span className='flex self-end text-4xl'> 01</span>
          <p className='py-2 tracking-wider text-justify'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime odit cum repellendus.
          </p>
          <button type='button' className='pl-1'>
            <DoubleArrow width={26} height={26} className='fill-white' />
          </button>
        </div>
        <div className='flex flex-1 flex-col text-white text-left px-3'>
          <span className='flex self-end text-4xl'> 01</span>
          <p className='py-2 tracking-wider text-justify'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime odit cum repellendus.
          </p>
          <button type='button' className='pl-1'>
            <DoubleArrow width={26} height={26} className='fill-white' />
          </button>
        </div>
        <div className='flex flex-1 flex-col text-white text-left px-3'>
          <span className='flex self-end text-4xl'> 01</span>
          <p className='py-2 tracking-wider text-justify'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime odit cum repellendus.
          </p>
          <button type='button' className='pl-1'>
            <DoubleArrow width={26} height={26} className='fill-white' />
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
