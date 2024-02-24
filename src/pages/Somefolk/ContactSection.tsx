import { Variants, motion } from 'framer-motion';
import Text from '../../components/Text';
import { HTMLInputTypeAttribute } from 'react';
import {
  ScrollConfiguration,
  BaseScrollable as Scrollable,
} from '../../components/Scrollable/Scrollable';

// image -20 -> 0

const offsetImage = '--offsetImage';

const imageScrollConfiguration: ScrollConfiguration<HTMLDivElement>[] = [
  {
    getStart: (node, position, meta) => position.top - meta.windowHeight,
    getEnd: (node, position, meta) => position.top + position.height + meta.windowHeight,
    mapTo: [-20, 15],
    mutate: (node, value) => node.style.setProperty(offsetImage, `${value}%`),
  },
];

export default function ContactSection() {
  return (
    <section className='flex p-[1vw] h-screen bg-olive-100 text-olive-900'>
      <div className='w-1/2 px-[8vw] text-center flex flex-col items-center justify-around'>
        <Text variant='medium' className='w-4/5' as='h5'>
          What are you waiting for? Let's do this.
        </Text>
        <form className='w-full flex flex-col gap-8'>
          <Input placeholder={`What's your name?`} inputName='name' label='01' />
          <Input
            placeholder='And your email address?'
            inputName='address'
            label='02'
            type='email'
          />
          <Input placeholder='How can help?' inputName='address' label='02' type='are' />
          <div className='w-full h-[2px] bg-olive-900 mt-36' />
          <motion.button
            type='submit'
            variants={submitVariant}
            initial='initial'
            whileHover='hover'
            className='font-arges text-5xl py-3 w-full border border-black'
          >
            SEND IT!
          </motion.button>
        </form>
      </div>
      <Scrollable
        className='w-1/2 rounded-md overflow-hidden'
        configuration={imageScrollConfiguration}
      >
        <img
          src='images/gang.jpg'
          className='w-full h-[120%] object-cover'
          style={{ transform: `translateY(var(${offsetImage}))` }}
        />
      </Scrollable>
    </section>
  );
}

interface InputProps {
  placeholder: string;
  inputName: string;
  label: string;
  type?: HTMLInputTypeAttribute;
}

function Input({ placeholder, label, inputName, type = 'input' }: InputProps) {
  return (
    <div className='w-full relative '>
      <input
        name={inputName}
        placeholder={placeholder}
        className='w-full bg-olive-100 text-olive-900
          font-mori text-2xl tracking-tighter	
          placeholder:text-olive-900 placeholder:uppercase
          border-b-2 border-black
          focus:outline-none
          focus:border-white
          '
        required
      />
      <label
        htmlFor={inputName}
        className='
        absolute bottom-0 right-0
        font-mori text-2xl tracking-tighter'
      >
        {label}
      </label>
    </div>
  );
}

const submitVariant: Variants = {
  initial: {
    background: '#192928',
    color: '#bfea88',
  },
  hover: {
    background: '#bfea88',
    color: '#192928',
    transition: {
      duration: 0.5,
    },
  },
};
