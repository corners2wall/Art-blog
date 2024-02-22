import AnimateButton from '../../components/AnimateButton';
import ScrollableLottie from '../../components/Lottie/ScrollableLottie';
import { BaseScrollable as Scrollable } from '../../components/Scrollable/Scrollable';
import { ScrollConfiguration } from '../../components/Scrollable/Scrollable';
import Text from '../../components/Text';

const textScrollConfiguration: ScrollConfiguration<HTMLDivElement>[] = [
  {
    getStart: (node, position, meta) => position.top - meta.windowHeight,
    getEnd: (node, position, meta) => position.top + position.height - meta.windowHeight,
    mapTo: [0, 40],
    mutate: (node, value) => (node.style.transform = `translateY(-${value}px)`),
  },
];

const textLowScrollConfiguration: ScrollConfiguration<HTMLDivElement>[] = [
  {
    getStart: (node, position, meta) => position.top - meta.windowHeight,
    getEnd: (node, position, meta) => position.top + position.height * 4 - meta.windowHeight,
    mapTo: [0, 40],
    mutate: (node, value) => (node.style.transform = `translateY(-${value}px)`),
  },
];

export default function IntroSection() {
  return (
    <div className='pt-12'>
      <div className='h-auto leading-none font-black flex flex-col gap-3 pb-14 pl-[1vw]'>
        <Scrollable
          configuration={textScrollConfiguration}
          className='flex items-center mb-[-4.5vw] tracking-[0.05vw] pb-4'
        >
          <Text variant='extra-large'>RUSSIA</Text>
          <div className='w-[8vw] h-[0.5vw] bg-olive-100 mx-[1vw] mb-[2.5vw]' />
          <Text variant='extra-large'>BASED</Text>
          <Text variant='extra-large' className='ml-[3.5vw]'>
            ART
          </Text>
        </Scrollable>
        <Scrollable
          configuration={textScrollConfiguration}
          className='flex items-center mb-[-4.5vw] tracking-[0.05vw] pb-4'
        >
          <Text variant='extra-large'>DIRECTOR</Text>
          <div className='w-[0.5vw] h-[10vw] bg-olive-100 mx-[3vw] mb-[2.5vw]' />
          <Text variant='extra-large'>DESIGNER</Text>
        </Scrollable>
        <Scrollable
          configuration={textScrollConfiguration}
          className='flex items-center mb-[-4.5vw] tracking-[0.05vw] pb-4'
        >
          <Text variant='extra-large'>CREATIVE DEVELOPER</Text>
        </Scrollable>
      </div>
      <div className='flex items-center mb-[-4.5vw] tracking-[0.05vw] justify-center flex-col gap-4'>
        <Scrollable configuration={textLowScrollConfiguration}>
          <Text variant='medium' className='pb-4'>
            TELLING MEANINGFUL STORIES THAT NEED TO BE TOLD (BY HUMANS, NOT AI)
          </Text>
        </Scrollable>
        <Scrollable
          configuration={textLowScrollConfiguration}
          className='flex flex-col items-center'
        >
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
        </Scrollable>
      </div>
      <div className='flex items-center justify-center mt-16 text-5xl font-black'>
        <div className='flex flex-col items-center pb-20'>
          <Text variant='small'>CREATING STRONG BRANDS</Text>
          <Text variant='medium'>BRAND IDENTITY</Text>
          <Text variant='medium'>BRAND STRATEGY</Text>
          <Text variant='medium'>TYPOGRAPHY</Text>
        </div>
        <ScrollableLottie className='h-1/2 w-1/2' path='/lottie/fallingMan.json' />
        <div className='flex flex-col items-center pb-20'>
          <Text variant='small'>DEVELOPING DIGITAL PRODUCTS</Text>
          <Text variant='medium'>ART DIRECTION</Text>
          <Text variant='medium'>DIGITAL DESIGN</Text>
          <Text variant='medium'>DEVELOPMENT</Text>
        </div>
      </div>
      <div className='relative flex flex-col items-center -mt-20 z-10 pb-36'>
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
        <AnimateButton variant='light'>MORE ABOUT ME</AnimateButton>
        {/* <a className='text-3xl cursor-pointer pb-36'>MORE ABOUT ME</a> */}
      </div>
    </div>
  );
}
