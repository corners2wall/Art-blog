import { ReactComponent as Cosmonaut } from '../../assets/icons/cosmonaut.svg';
import getImageUrl from '../../utils/getImageUrl';
//ToDo pass svg as image for out of bundle
const filmGrain = getImageUrl('peopleAnimation', 'gif');

export default function PageNotFound() {
  return (
    <div
      className={`h-screen bg-black bg-[url('/white_grain.png'),_url('/film_grain.png')] text-white py-16`}
    >
      <div className='flex w-fit mx-auto h-full items-center flex-wrap-reverse'>
        <div className='flex flex-col w-1/2'>
          <h3 className='text-[55px] whitespace-nowrap tracking-wide'>
            Oops! You ran out of oxygen.
          </h3>
          <p className='text-[20px] font-light mt-8 tracking-wide'>
            The page you&apos;re looking for is now beyond our reach. Let&apos;s get you..
          </p>
          <div className='mt-16 font-semibold text-lg p-3'>Back Home in</div>
          <div className='mt-16 uppercase text-xs'>home page</div>
        </div>
        <div className='pt-5'>
          <span className='relative text-[360px] mb-96 font-bold'>
            404
            <Cosmonaut className='animate-resizeToHidden top-0 bottom-0 left-0 right-0 mx-auto w-fit h-fit absolute' />
            {/* <img src={filmGrain} className='w-1/2' /> */}
          </span>
        </div>
        {/* for fire class */}
        <div className='animate-hidden-visible' />
      </div>
    </div>
  );
}
