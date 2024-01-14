import getImageUrl from '../../utils/getImageUrl';
import { PropsWithChildren, useRef, useState } from 'react';
import VolumetricText from '../../components/VolumetricText';
import ScreenWrapper from '../../components/ScreenWrapper';
import OverlayLayer from '../../components/OverlayLayer';
import useRequestAnimationFrame from '../../hooks/animation/useRequestAnimationFrame';
import useScrollAnimation from '../../hooks/animation/useScrollAnimation';
import { IntersectionOptions } from '../../utils/ScrollAnimation';
import { AnimationOptions } from '../../utils/Animation';
import Tile from '../../components/Tile';
import Text from '../../components/Text';
import Lottie from './Lottie';

const tileImage = getImageUrl('background', 'jpg');

// ref: https://www.somefolk.co.uk/
export default function Somefolk() {
  const [isModelsLoaded, setIsModelsLoaded] = useState(false);

  return (
    <div className='text-olive-100 bg-olive-900 font-arges'>
      <ScreenWrapper className='overflow-hidden'>
        {isModelsLoaded && (
          <>
            {/* <Tile image={tileImage} /> */}
            <OverlayLayer />
          </>
        )}
        <ScreenWrapper position='absolute'>
          <VolumetricText setIsModelsLoaded={setIsModelsLoaded} word='SOMEFOLK' />
        </ScreenWrapper>
      </ScreenWrapper>
      <div className='pl-[1vw] h-auto leading-none mt-4 mb-12 font-black'>
        <AnimatedTextRow containerClassName='pb-4'>
          <Text variant='extra-large'>RUSSIA</Text>
          <div className='w-[8vw] h-[0.5vw] bg-olive-100 mx-[1vw] mb-[2.5vw]' />
          <Text variant='extra-large'>BASED</Text>
          <Text variant='extra-large' className='ml-[3.5vw]'>
            ART
          </Text>
        </AnimatedTextRow>
        <AnimatedTextRow containerClassName='pb-4'>
          <Text variant='extra-large'>DIRECTOR</Text>
          <div className='w-[0.5vw] h-[10vw] bg-olive-100 mx-[3vw] mb-[2.5vw]' />
          <Text variant='extra-large'>DESIGNER</Text>
        </AnimatedTextRow>
        <AnimatedTextRow containerClassName='pb-4'>
          <Text variant='extra-large'>CREATIVE DEVELOPER</Text>
        </AnimatedTextRow>
      </div>
      <AnimatedTextRow containerClassName='justify-center pt-3 flex-col'>
        <h3 className='text-5xl font-black pb-4'>
          TELLING MEANINGFUL STORIES THAT NEED TO BE TOLD (BY HUMANS, NOT AI)
        </h3>
        <div className='flex gap-2 items-center'>
          <Text variant='medium-bold'>WORKING</Text>
          <Text variant='small'>WITH</Text>
          <Text variant='medium-bold'>PASSIONATE PEOPLE</Text>
          <Text variant='small'>&</Text>
          <Text variant='medium-bold'>DISRUPTORS</Text>
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
      </AnimatedTextRow>
      <div className='flex items-center justify-center mt-16 text-5xl font-black'>
        <div className='flex flex-col items-center'>
          <Text variant='small-bold'>MEMORABLE</Text>
          <Text variant='medium'>BRAND IDENTITY</Text>
          <Text variant='medium'>BRAND STRATEGY</Text>
          <Text variant='medium'>TYPOGRAPHY</Text>
        </div>
        <Lottie className='h-1/2 w-1/2' path='public/lottie/fallingMan.json' />
        <div className='flex flex-col items-center'>
          <Text variant='small-bold'>DEVELOPING DIGITAL PRODUCTS</Text>
          <Text variant='medium'>ART DIRECTION</Text>
          <Text variant='medium'>DIGITAL DESIGN</Text>
          <Text variant='medium'>DEVELOPMENT</Text>
        </div>
      </div>
      <div className='flex flex-col items-center'>
        <Text variant='medium-large' as='h2'>
          V2.0 (2K23)
        </Text>
        <h2 className='font-blackstone text-8xl font-thin	pb-4'>by Somefolk</h2>
        <Text variant='small-bold' as='p' className='w-1/2 pb-12 text-center'>
          I'M ARTEM, A FREELANCE ART DIRECTOR, VISUAL DESIGNER, CREATIVE DEVELOPER AND HOUSEPLANT
          ENTHUSIAST BASED IN WINTER RUSSIA. I WORK WITH BRANDS OF ALL SIZES, ACROSS ALL INDUSTRIES,
          IN EVERY CORNER OF THE WORLD., CREATING MEMORABLE BRANDS AND DIGITAL PRODUCTS THAT
          RESONATE WITH THEIR AUDIENCE. I BELIEVE THAT STORIES TOLD AUTHENTICALLY & VISUALLY ARE
          MORE EFFECTIVE AT CAPTIVATING AUDIENCES, EVOKING EMOTION AND IMPROVING CONVERSION ...
          STORIES TOLD BY SOME REAL FOLK.
        </Text>
        <Text variant='small-bold' as='p' className='pb-4'>
          SOMEFOLK® BESPOKE QUALITY DIGITAL GOODS
        </Text>
        <Text variant='small' as='p' className='pb-12'>
          SUMMER CLUB | RYAZAN | RUSSIA
        </Text>
        <a className='text-3xl cursor-pointer pb-36'>MORE ABOUT ME</a>
        <h2 className='text-[45vw] leading-[40vw] font-arges'>WORK</h2>
      </div>
      <section className='px-[1vw] pt-[15vw] flex flex-col items-center text-center mb-16'>
        <div className='flex gap-2 items-center'>
          <Text variant='medium-bold'>BRAVE BRANDS</Text>
          <Text variant='small'>HAVE THE</Text>
          <Text variant='medium-bold'>POWER</Text>
          <Text variant='small'>TO MAKE</Text>
          <Text variant='medium-bold'>LASTING CHANGE</Text>
        </div>
        <div className='flex gap-2 items-center'>
          <Text variant='small'>I CREATE</Text>
          <Text variant='medium-bold'>HIGHLY BESPOKE</Text>
          <Text variant='small'>BRANDS AND WEBSITES THAT ARE</Text>
          <Text variant='medium-bold'>NEVER OFF THE SHELF</Text>
        </div>
        <Text variant='medium-large' as='h2' className='mt-[18vh]'>
          WORKING WITH STARTUPS & SMES TO CREATE MEMORABLE BRANDS
        </Text>
        <Lottie className='h-1/3 w-1/2 mt-[-8vw]' path='public/lottie/walkingMan.json' autoplay />
        <Text variant='medium-large' as='h2' className='mt-[-3.5vh]'>
          & HIGHLY BESPOKE WEBSITES
        </Text>
        <Text variant='medium' className='my-[2vh] mb-12'>
          ALWAYS BESPOKE. NEVER OFF-THE-SHELF.
        </Text>
        <div className='flex gap-2 items-center'>
          <Text variant='medium-bold'>CREATIVE-FIRST</Text>
          <Text variant='small'>DESIGNS</Text>
          <Text variant='medium-bold'>TAILORED</Text>
          <Text variant='small'>TO YOUR BRAND'S</Text>
          <Text variant='medium-bold'>AUDIENCE</Text>
          <Text variant='small'>AND</Text>
          <Text variant='medium-bold'>AMBITIONS</Text>
        </div>
        <div className='flex gap-2 items-center'>
          <Text variant='small'>THAT HELP</Text>
          <Text variant='medium-bold'>DISRUPTORS</Text>
          <Text variant='small'>TO</Text>
          <Text variant='medium-bold'>CUT THROUGH</Text>
          <Text variant='small'>THE</Text>
          <Text variant='medium-bold'>NOISE</Text>
        </div>
      </section>
      <section className='pt-60 flex justify-center'>
        <div className='w-2/3 text-center'>
          <Text variant='medium-title'>
            OFFERING CREATIVE-LED DESIGN AND DEVELOPMENT FOR AMBITIOUS BRANDS THAT WANT TO EXPAND
            AND CREATE
          </Text>
          <h2 className='font-blackstone text-[10rem] font-thin	pb-4 relative top-[-5rem]'>
            lasting change
          </h2>
        </div>
      </section>
      <ScreenWrapper className='bg-somefolk'></ScreenWrapper>
      <ScreenWrapper className='bg-somefolk'></ScreenWrapper>
    </div>
  );
}

type AnimatedTextRowProps = PropsWithChildren & {
  containerClassName?: string;
};

function AnimatedTextRow({ children, containerClassName }: AnimatedTextRowProps) {
  const intersectionOptions: IntersectionOptions = {
    runningOn: 'bottom',
    threshold: [0.5, 0.6, 0.7, 0.8, 0.9, 1],
  };

  const animationOption: AnimationOptions = {
    end: -15,
    duration: 500,
  };

  const ref = useRef<HTMLDivElement>(null);

  const { targetRef, animation } = useScrollAnimation<HTMLDivElement>(
    intersectionOptions,
    animationOption
  );

  const showChangeValue = (v: number) => {
    if (ref.current) ref.current.style.transform = `translateY(${v}px)`;
  };

  useRequestAnimationFrame(showChangeValue, animation);

  return (
    <div ref={targetRef}>
      <div
        className={`flex items-center mb-[-4.5vw] tracking-[0.05vw] ${containerClassName}`}
        ref={ref}
      >
        {children}
      </div>
    </div>
  );
}
