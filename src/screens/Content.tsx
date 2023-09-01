import { Variants, motion, useAnimationControls } from 'framer-motion';
import { OPEN_TERMINAL } from '../utils/chanelName';
import { useSubscribe } from '../utils/EventBus';
import Image1 from '../assets/1.jpg';
import Image2 from '../assets/2.jpg';
import Image3 from '../assets/3.jpg';
import Carousel from '../components/Carousel/Carousel';
import Post from '../components/Post';

const images = [Image1, Image2, Image3];

const expandAnimation: Variants = {
  initial: {
    overflow: 'hidden',
    flexBasis: 0,
  },
  animate: {
    flexBasis: '100%',
    transition: {
      duration: 1,
    },
  },
};

const contentAnimation: Variants = {
  initial: {
    x: '100%',
  },
  animate: {
    x: 0,
    transition: {
      duration: 1,
    },
  },
};

export default function Content() {
  const controls = useAnimationControls();

  useSubscribe(OPEN_TERMINAL, ([isOpen]) => isOpen && controls.start('animate'));

  return (
    <motion.div
      className='text-black bg-white mt-12'
      variants={expandAnimation}
      initial='initial'
      animate={controls}
    >
      <motion.div variants={contentAnimation} animate={controls} className='m-5'>
        <Post
          description='Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem ut sit molestias doloremque'
          tag='BLOG'
        />
        <Post
          description='Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem ut sit molestias doloremque'
          tag='BLOG'
        />
        <Post
          description='Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem ut sit molestias doloremque'
          tag='BLOG'
        />
        <Post
          description='Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem ut sit molestias doloremque'
          tag='BLOG'
        />
        <Post
          description='Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem ut sit molestias doloremque'
          tag='BLOG'
        />
      </motion.div>
    </motion.div>
  );
}
