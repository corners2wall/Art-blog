import getImageUrl from '../../utils/getImageUrl';
import { PropsWithChildren, forwardRef, useEffect, useRef } from 'react';
import { motion, useAnimate } from 'framer-motion';

const background = getImageUrl('background', 'jpg');
const getScaleValue = (value: number, scale: number) => value * (1 / (1 - scale));

interface ImageBlockProps {
  imageSrc: string;
  className?: string;
}

const ImageBlock = forwardRef<HTMLDivElement, ImageBlockProps>(({ imageSrc, className }, ref) => {
  return (
    <div className={`w-screen h-screen max-h-screen relative ${className}`} ref={ref}>
      <img className='w-full h-full object-cover' src={imageSrc} />
    </div>
  );
});

function ImageRow({ children }: PropsWithChildren) {
  return <div className='flex gap-5'>{children}</div>;
}

function TileWrapper({ children }: PropsWithChildren) {
  return (
    <div className='absolute -left-1/2 -top-2/4 flex flex-col items-center gap-5'>{children}</div>
  );
}

// ref: https://www.somefolk.co.uk/
export default function Custom() {
  const anchorRef = useRef<HTMLDivElement>(null);

  const [scope, animate] = useAnimate<HTMLDivElement>();

  useEffect(() => {
    if (anchorRef.current) {
      const { x, width, y } = anchorRef.current.getBoundingClientRect();

      const leftOffset = getScaleValue(x, 0.5);
      const topOffset = getScaleValue(y, 0.5);

      length = x - width / 2;

      animate(
        scope.current,
        {
          transform: `translate(${-length}px) scale(0.5)`,
          opacity: [0, 1],
          filter: ['brightness(60%)', 'brightness(85%)'],
        },
        { duration: 2 }
      ).then(() => {
        anchorRef.current!.animate(
          { boxShadow: 'inset 0px 0px 113px 43px rgba(0,0,0,0.53)' },
          {
            duration: 1000,
            fill: 'forwards',
            pseudoElement: '::after',
            easing: 'cubic-bezier(.06,.66,.04,.88)',
          }
        );
        animate(
          scope.current,
          {
            transform: `translate(-${leftOffset}px, -${topOffset}px) scale(1)`,
            filter: 'brightness(50%)',
          },
          { duration: 1.5 }
        );
      });
    }
  }, []);

  const pseudoShadow = `after:content-[''] after:absolute after:top-0 after:left-0 after:right-0 after:bottom-0`;

  return (
    <div className='overflow-hidden bg-[#333333]'>
      <motion.div className='scale-50 min-w-[100vw] min-h-[100vh] origin-top-left	' ref={scope}>
        <TileWrapper>
          <ImageRow>
            <ImageBlock imageSrc={background} />
            <ImageBlock imageSrc={background} />
            <ImageBlock imageSrc={background} />
            <ImageBlock imageSrc={background} />
            <ImageBlock imageSrc={background} />
            <ImageBlock imageSrc={background} />
            <ImageBlock imageSrc={background} />
            <ImageBlock imageSrc={background} />
          </ImageRow>
          <ImageRow>
            <ImageBlock imageSrc={background} />
            <ImageBlock imageSrc={background} />
            <ImageBlock imageSrc={background} />
            <ImageBlock imageSrc={background} />
            <ImageBlock imageSrc={background} />
            <ImageBlock imageSrc={background} ref={anchorRef} className={pseudoShadow} />
            <ImageBlock imageSrc={background} />
          </ImageRow>
          <ImageRow>
            <ImageBlock imageSrc={background} />
            <ImageBlock imageSrc={background} />
            <ImageBlock imageSrc={background} />
            <ImageBlock imageSrc={background} />
            <ImageBlock imageSrc={background} />
            <ImageBlock imageSrc={background} />
            <ImageBlock imageSrc={background} />
            <ImageBlock imageSrc={background} />
          </ImageRow>
        </TileWrapper>
      </motion.div>
    </div>
  );
}
