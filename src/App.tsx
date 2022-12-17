import './App.css';
import Video from './components/Video/Video';
import Image1 from './assets/1.jpg';
import Image2 from './assets/2.jpg';
import Image3 from './assets/3.jpg';
import { ReactComponent as DoubleArrow } from './assets/doubleArrow.svg';
import Carousel from './components/Carousel/Carousel';

const images = [Image1, Image2, Image3];

function App() {
  return (
    <div className='min-h-screen flex flex-col bg-black'>
      {/* <div className='relative min-h-screen flex flex-col'>
        <Video />
        <div className='absolute min-h-screen w-full bg-black opacity-20'>
          <span className='absolute top-1/3 left-1/4 -rotate-12 text-purple-50 text-9xl'>
            SAMPLE
          </span>
          <span className='absolute top-1/2 left-1/3 -rotate-12 text-purple-50 text-9xl'>TEXT</span>
        </div>
      </div> */}
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
