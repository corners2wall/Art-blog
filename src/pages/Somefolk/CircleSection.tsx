import Lenis from '@studio-freight/lenis';
import Text from '../../components/Text';
import useScroll from '../../hooks/useScroll';
import { useRef } from 'react';

const circleParts = [
  'svg/wheel1.svg',
  'svg/wheel2.svg',
  'svg/wheel3.svg',
  'svg/wheel4.svg',
  'svg/wheel5.svg',
  'svg/wheel6.svg',
];

export default function CircleSection() {
  const circleRef = useRef<HTMLDivElement>(null);
  const rotateCircle = (lenis: Lenis) => {
    if (circleRef.current) {
      console.log(lenis);
    }
  };

  useScroll(rotateCircle);

  return (
    <section className='mt-[2vh] mx-[2vw] flex flex-col items-center text-center'>
      <Text variant='medium-title' className='mb-4'>
        AS ARTIFICIAL INTELLIGENCE BECOMES A BUZZWORD FOR REPLACING HUMAN ABILITY, IT’S MORE
        IMPORTANT THAN EVER TO TELL YOUR STORY IN AN AUTHENTIC WAY
      </Text>
      <Text variant='small-bold' className='mb-4'>
        SOMEFOLK® BESPOKE QUALITY DIGITAL GOODS
      </Text>
      <Text variant='small' className='mb-60'>
        COVENT GARDEN | LONDON | ENGLAND
      </Text>
      <Circle parts={circleParts} ref={circleRef} />
      <div className='flex h-[500vh] w-full'>
        <div className='w-2/3'></div>
        <div className='text-left flex flex-col w-[26vw] mb-28 mt-[200vh]'>
          <Text variant='medium' as='h4' className='mb-8'>
            I'M CURRENTLY TAKING ENQUIRIES FOR PROJECTS STARTING IN Q2 2024
          </Text>
          <Text variant='small-bold' as='p'>
            WHETHER YOU'RE A STARTUP LOOKING TO BUILD AN IDENTITY FROM THE GROUND UP, OR AN
            ESTABLISHED BRAND IN NEED OF A DIGITAL REFRESH, I'D LOVE TO HEAR YOUR STORY. I WORK WITH
            BRANDS ACROSS ALL SECTORS IN ALL CORNERS OF THE WORLD. I'M CURRENTLY TAKING ENQUIRIES
            FOR COLLABORATIONS IN THE FINAL QUARTER OF 2023.
          </Text>
          <div className='w-full my-32'>
            <div className='pt-[125%] relative overflow-hidden'>
              <img
                src='images/pinkFlex.jpg'
                className='absolute top-0 h-[120%] bg-no-repeat bg-cover'
              />
            </div>
          </div>
          <Text variant='medium' as='h4' className='mb-8'>
            RECOGNITION
          </Text>
          <Text variant='small-bold' as='p' className='mb-12'>
            I'M CONSTANTLY INSPIRED BY THE WIDER DESIGN COMMUNITY, AND HAVE BEEN FORTUNATE ENOUGH TO
            RECEIVE RECOGNITION FOR MY WORK FOR SEVERAL CLIENT PROJECTS OVER THE PAST COUPLE OF
            YEARS.
          </Text>
          <div className='flex justify-between'>
            <Text variant='small-bold'>AWWWARDS SITE OF THE DAY X4</Text>
            <Text variant='small-bold'>INDEPENDENT</Text>
          </div>
          <div className='h-[1px] w-full bg-olive-100 my-2' />
          <div className='flex justify-between'>
            <Text variant='small-bold'>AWWWARDS SITE OF THE DAY X3</Text>
            <Text variant='small-bold'>AGENCY PARTNER</Text>
          </div>
          <div className='h-[1px] w-full bg-olive-100 my-2' />
          <Text variant='small-bold'>FWA SITE OF THE DAY X4</Text>
          <div className='h-[1px] w-full bg-olive-100 my-2' />
          <Text variant='small-bold'>CSS SITE OF THE DAY X3</Text>
          <div className='w-full my-32'>
            <div className='pt-[125%] relative overflow-hidden'>
              <img
                src='images/monkey.jpg'
                className='absolute top-0 h-[120%] bg-no-repeat bg-cover'
              />
            </div>
          </div>
          <Text variant='medium' as='h4' className='mb-8'>
            SOCIAL INACTIVITY
          </Text>
          <Text variant='small-bold' as='p' className='mb-12'>
            FOR VERY OCCASIONAL AND UNPREDICTABLE NUGGETS OF USEFUL AND USELESS INFORMATION (IN
            EQUAL MEASURE), PLEASE FEEL FREE TO FOLLOW MY SOCIAL CHANNELS:
          </Text>
          <div className='flex justify-between'>
            <Text variant='small-bold'>INSTAGRAM</Text>
            <Text variant='small-bold'>@BYSOMEFOLK</Text>
          </div>
          <div className='h-[1px] w-full bg-olive-100 my-2' />
          <div className='flex justify-between'>
            <Text variant='small-bold'>AWWWARDS</Text>
            <Text variant='small-bold'>/SOMEFOLK</Text>
          </div>
          <div className='h-[1px] w-full bg-olive-100 my-2' />
          <div className='flex justify-between'>
            <Text variant='small-bold'>LINKEDIN</Text>
            <Text variant='small-bold'>/SOMEFOLK</Text>
          </div>
          <div className='h-[1px] w-full bg-olive-100 my-2' />
          <div className='flex justify-between'>
            <Text variant='small-bold'>DRIBBLE</Text>
            <Text variant='small-bold'>/SOMEFOLK</Text>
          </div>
          <div className='h-[1px] w-full bg-olive-100 my-2' />
        </div>
      </div>
    </section>
  );
}

interface CircleProps {
  parts: string[];
}

function Circle({ parts }: CircleProps) {
  return (
    <div className='w-[38vw] h-[38vw] relative'>
      {parts.map((part, index) => (
        <div
          key={index}
          style={{ backgroundImage: `url(${part})` }}
          className='w-full h-full bg-no-repeat bg-contain absolute'
        />
      ))}
    </div>
  );
}
