interface SlideProps {
  src: string;
}

export default function Slide({ src }: SlideProps) {
  return (
    <div className='relative pb-[40%] min-w-full'>
      <img src={src} className='object-cover w-full h-full absolute top-0 left-0' />
    </div>
  );
}
