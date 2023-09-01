import ConsistentTextAnimation from '../Animation/ConsistentTextAnimation';
import Carousel from '../Carousel/Carousel';
import Image1 from '../../assets/1.jpg';
import Image2 from '../../assets/2.jpg';
import Image3 from '../../assets/3.jpg';

interface PostProps {
  description: string;
  tag: string;
}

const images = [Image1, Image2, Image3];

export default function Post({ description, tag }: PostProps) {
  return (
    <section className='mb-32'>
      <h3 className='mb-4 text-sm'>{tag}</h3>
      <div className='flex justify-center items-center bg-black mb-8'>
        <Carousel images={images} />
      </div>
      <div className='grid grid-cols-2 gap-7'>
        <div className='text-5xl text-black'>
          <ConsistentTextAnimation text='SS23 VLOG' />
          <ConsistentTextAnimation text='-> FASHION WEEK' />
        </div>
        <div className='text-sm'>{description}</div>
      </div>
    </section>
  );
}
