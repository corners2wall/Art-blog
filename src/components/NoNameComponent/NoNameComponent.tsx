import peopleAnimation from '../../assets/peopleAnimation.gif';
import bg from '../../assets/photoblya.avif';

export default function NoNameComponent() {
  return (
    <div className='text-white py-52 relative'>
      <div className='absolute top-0 left-0 w-full h-full'>
        <img src={bg} alt='' className='object-cover w-full aspect-[16/5]' />
      </div>
      <div className='grid grid-cols-[1fr_auto] relative max-w-[1600px] mx-auto'>
        <div>
          <h2 className='text-7xl'>Join our Discord</h2>
          <h2 className='text-7xl'>-{'>'}Community</h2>
          <span className='text-xs'>
            A platform to serve as the pulse of the community. Important notifications and updates
            will go live here first giving you, first insight on the latest offerings at Terminal™.
          </span>
        </div>
        <img src={peopleAnimation} alt='' className='w-36' />
      </div>
    </div>
  );
}
