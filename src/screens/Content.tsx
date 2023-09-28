import { Variants, motion, useAnimationControls } from 'framer-motion';
import { OPEN_TERMINAL } from '../utils/chanelName';
import { useSubscribe } from '../utils/EventBus';
import Post from '../components/Post';

const expandAnimation: Variants = {
  initial: {
    flexBasis: 0,
  },
  animate: {
    flexBasis: '100%',
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
      className='text-black bg-white mt-12 overflow-hidden'
      variants={expandAnimation}
      initial='initial'
      animate={controls}
    >
      <motion.div className='m-5'>
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
