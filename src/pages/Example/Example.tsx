import useScaleHook from '../../hooks/useScaleHook';

export default function Example() {
  const ref = useScaleHook<HTMLImageElement>();

  return (
    <div className='w-80 h-80 overflow-hidden'>
      <img
        ref={ref}
        src='https://source.unsplash.com/random'
        className='h-full w-full object-cover origin-top-left'
      />
    </div>
  );
}
