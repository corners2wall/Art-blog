import getImageUrl from '../../utils/getImageUrl';

const peopleAnimationSrc = getImageUrl('peopleAnimation', 'gif');
const backgroundSrc = getImageUrl('footerBackground', 'avif');

export default function HomeFooter() {
  return (
    <div className='text-white py-52 relative'>
      <div className='absolute top-0 left-0 right-0 bottom-0'>
        <img src={backgroundSrc} className='object-cover w-full h-full' />
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
        <img src={peopleAnimationSrc} alt='' className='w-36' />
      </div>
    </div>
  );
}
