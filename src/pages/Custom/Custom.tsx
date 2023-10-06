import { useState } from 'react';
import Button from '../../components/Button';
import useMousePosition from '../../hooks/useMousePosition';

export default function Custom() {
  // ref: https://www.somefolk.co.uk/
  const mousePosition = useMousePosition();
  const [scale, setScale] = useState<any>({});

  return (
    <div className='flex'>
      <Button
        className='fixed top-0 left-0 z-10'
        label='scale'
        onClick={() => {
          // scale(2,2)
          setScale({
            transform: `translateX(-1200px) scale(.5)`, // translateY(100px) translateZ(0px)`,
            // transform: `translateX(${mousePosition.x}px) translateY(${mousePosition.y}px) translateZ(0px)`,
            // transform: 'scale(.5)',
            // transformOrigin: `${mousePosition.x}px ${mousePosition.y}px`,
          });
          console.log(mousePosition);
        }}
      />
      <div
        style={{ ...scale }}
        className='flex flex-col gap-5 scale-[0.5] items-center absolute 
        duration-[2000ms]'
      >
        {/* top-[-100%] left-[-175%]  */}
        <div className='flex gap-5'>
          <div className='w-screen min-h-screen bg-slate-400 relative'>1</div>
          <div className='w-screen min-h-screen bg-slate-400 relative'>2</div>
          <div className='w-screen min-h-screen bg-slate-400 relative'>3</div>
          <div className='w-screen min-h-screen bg-slate-400 relative'>4</div>
          <div className='w-screen min-h-screen bg-slate-400 relative'>5</div>
          <div className='w-screen min-h-screen bg-slate-400 relative'>6</div>
        </div>
        <div className='flex gap-5'>
          <div className='w-screen min-h-screen bg-slate-400 relative'>1</div>
          <div className='w-screen min-h-screen bg-slate-400 relative'>2</div>
          <div className='w-screen min-h-screen bg-slate-400 relative'>3</div>
          <div className='w-screen min-h-screen bg-slate-400 relative'>4</div>
          <div className='w-screen min-h-screen bg-slate-400 relative'>5</div>
        </div>
        <div className='flex gap-5'>
          <div className='w-screen min-h-screen bg-slate-400 relative'>1</div>
          <div className='w-screen min-h-screen bg-slate-400 relative'>2</div>
          <div className='w-screen min-h-screen bg-slate-400 relative'>3</div>
          <div className='w-screen min-h-screen bg-slate-400 relative'>4</div>
          <div className='w-screen min-h-screen bg-slate-400 relative'>5</div>
          <div className='w-screen min-h-screen bg-slate-400 relative'>6</div>
        </div>
      </div>
    </div>
  );
}
