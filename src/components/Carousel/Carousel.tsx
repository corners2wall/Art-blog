import useCarousel from 'embla-carousel-react';
import Row from '../Layouts/Row';
import Slide from './Slide';
import { ReactComponent as Arrow } from '../../assets/arrow.svg';

interface CarouselProps {
  images: string[];
}

export default function Carousel({ images }: CarouselProps) {
  const [ref, carouselApi] = useCarousel({ draggable: true });

  const getNextSlide = () => carouselApi?.scrollNext();
  const getPrevSlise = () => carouselApi?.scrollPrev();

  return (
    <>
      <button
        type='button'
        onClick={getPrevSlise}
      >
        <Arrow fill='white' height={48} width={48} />
      </button>
      <Row className='overflow-hidden' ref={ref}>
        <Row>
          {images.map((image) => (
            <Slide src={image} />
          ))}
        </Row>
      </Row>
      <button
        type='button'
        onClick={getNextSlide}
      >
        <Arrow fill='white' height={48} width={48} className='rotate-180' />
      </button>
    </>
  );
}
