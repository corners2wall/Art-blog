import getImageUrl from '../../utils/getImageUrl';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import VolumetricText from '../../components/VolumetricText';
import ScreenWrapper from '../../components/ScreenWrapper';
import OverlayLayer from '../../components/OverlayLayer';
import useSmoothScroll from '../../hooks/animation/useSmoothScroll';
import useRequestAnimationFrame from '../../hooks/animation/useRequestAnimationFrame';
import useScrollAnimation from '../../hooks/animation/useScrollAnimation';
import ScrollAnimation, { IntersectionOptions } from '../../utils/ScrollAnimation';
import { AnimationOptions } from '../../utils/Animation';

const tileImage = getImageUrl('background', 'jpg');

// ref: https://www.somefolk.co.uk/
export default function Somefolk() {
  const [isModelsLoaded, setIsModelsLoaded] = useState(false);
  useSmoothScroll();

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
      <Layout />
      {/* <Layout />
      <Layout /> */}
      <ScreenWrapper className='bg-somefolk'></ScreenWrapper>
      <ScreenWrapper className='bg-somefolk'></ScreenWrapper>
    </div>
  );
}

function Layout() {
  return (
    <div className='p-[1vw] h-auto leading-none mt-6'>
      <AnimateTextRow2 />
      <AnimateTextRow />
      <div className='inline-flex items-center mb-[-4.5vw] tracking-[0.05vw] mt-6'>
        <h2 className='text-[21vw] font-black'>DIRECTOR</h2>
        <div className='w-[1vw] h-[10vw] bg-olive-100 mx-[2vw] mb-[4.5vw]' />
        <h2 className='text-[21vw] font-black'>DESIGNER</h2>
      </div>
      <div className='inline-flex items-center mb-[-4.5vw] tracking-[0.15vw] mt-6'>
        <h2 className='text-[20vw] font-black'>CREATIVE DEVELOPER</h2>
      </div>
    </div>
  );
}

function AnimateTextRow() {
  const intersectionOptions: IntersectionOptions = {
    runningOn: 'bottom',
    threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
  };

  const animationOption: AnimationOptions = {
    end: -100,
    duration: 1000,
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
      <div className='inline-flex items-center mb-[-4.5vw] tracking-[0.05vw]' ref={ref}>
        <h2 className='text-[21vw] font-black'>RUSSIA</h2>
        <div className='w-[8vw] h-[1vw] bg-olive-100 mx-[0.5vw] mb-[4.5vw]' />
        <h2 className='text-[21vw] font-black'>BASED</h2>
        <h2 className='text-[21vw] font-black ml-[3.5vw]'>ART</h2>
      </div>
    </div>
  );
}

function AnimateTextRow2() {
  const intersectionOptions: IntersectionOptions = {
    runningOn: 'bottom',
    threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
  };

  const animationOption: AnimationOptions = {
    end: 1,
    duration: 1000,
  };

  const animationCallback = (node: HTMLDivElement, v: number) =>
    (node.style.opacity = v.toString());

  const { targetRef } = useScrollAnimation(intersectionOptions, animationOption, animationCallback);

  return (
    <div ref={targetRef}>
      <div className='inline-flex items-center mb-[-4.5vw] tracking-[0.05vw]'>
        <h2 className='text-[21vw] font-black'>RUSSIA</h2>
        <div className='w-[8vw] h-[1vw] bg-olive-100 mx-[0.5vw] mb-[4.5vw]' />
        <h2 className='text-[21vw] font-black'>BASED</h2>
        <h2 className='text-[21vw] font-black ml-[3.5vw]'>ART</h2>
      </div>
    </div>
  );
}
