import { PropsWithChildren, useRef } from 'react';
import Text from '../../components/Text';
import Lottie from './Lottie';
import { IntersectionOptions } from '../../utils/ScrollAnimation';
import { AnimationOptions } from '../../utils/Animation';
import useRequestAnimationFrame from '../../hooks/animation/useRequestAnimationFrame';
import useScrollAnimation from '../../hooks/animation/useScrollAnimation';

export default function WalkingSection() {
  return (
    <section className='px-[1vw] pt-[15vw] flex flex-col items-center text-center mb-40'>
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
      <Lottie className='h-1/3 w-1/2 mt-[-8vw]' path='/lottie/walkingMan.json' autoplay />
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
      <div className='flex mt-60'>
        <CardAnimationWrapper>
          <div className='flex flex-col w-[20vw] translate-x-12 translate-y-12 relative'>
            <div className='absolute -left-3 -bottom-14 w-1/3 h-1/3'>
              <img src='world.svg' className='w-full h-full' />
            </div>
            <div className='relative -rotate-[16deg] rounded-md overflow-hidden pt-[125%]'>
              <div className='absolute h-full w-full top-0 left-0'>
                <img src='images/leo.jpg' className='w-full h-full object-cover grayscale-[50%]' />
              </div>
            </div>
          </div>
        </CardAnimationWrapper>
        <div className='flex flex-col w-[20vw] -translate-y-32'>
          <div className='absolute -right-24 -bottom-56 w-full h-full'>
            <img src='address.svg' className='w-full h-full' />
          </div>
          <div className='relative rounded-md overflow-hidden pt-[125%]'>
            <div className='absolute top-0 left-0 h-full w-full'>
              <img
                src='images/forest.avif'
                className='w-full h-full object-cover grayscale-[50%]'
              />
            </div>
          </div>
        </div>
        <CardAnimationWrapper>
          <div className='flex flex-col w-[20vw] translate-y-12 relative'>
            <div className='absolute -right-12 -top-20 w-1/2 h-1/2'>
              <img src='founded.svg' className='w-full h-full' />
            </div>
            <div className='relative rotate-[24deg] rounded-md overflow-hidden pt-[125%]'>
              <div className='absolute top-0 left-0 h-full w-full grayscale-[50%]'>
                <img src='images/monkey.jpg' className='w-full h-full object-cover' />
              </div>
            </div>
          </div>
        </CardAnimationWrapper>
      </div>
    </section>
  );
}

interface CardProps extends PropsWithChildren {}

function CardAnimationWrapper({ children }: CardProps) {
  const intersectionOptions: IntersectionOptions = {
    runningOn: 'bottom',
    threshold: [0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
  };

  const animationOption: AnimationOptions = {
    end: -20,
    duration: 500,
  };

  const ref = useRef<HTMLDivElement>(null);

  const { targetRef, animation } = useScrollAnimation<HTMLDivElement>(
    intersectionOptions,
    animationOption
  );

  const changeTargetPosition = (v: number) => {
    if (ref.current) ref.current.style.transform = `translateY(${v}px)`;
  };

  useRequestAnimationFrame(changeTargetPosition, animation);

  return (
    <div ref={targetRef}>
      <div ref={ref}>{children}</div>
    </div>
  );
}