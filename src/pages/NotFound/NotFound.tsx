import { ReactComponent as Cosmonaut } from '../../assets/icons/cosmonaut.svg';
import getImageUrl from '../../utils/getImageUrl';
//ToDo pass svg as image for out of bundle
const filmGrain = getImageUrl('cosmonaut', 'svg');
//lg md sm
export default function PageNotFound() {
  return (
    <div
      className={`h-screen bg-black bg-[url('/white_grain.png'),_url('/film_grain.png')] text-white py-20`}
    >
      <div className='flex flex-col lg:flex-row-reverse lg:w-[1170px] lg:mx-auto h-full lg:items-center'>
        <div className='flex w-fit mx-auto relative lg:w-fit'>
          <span className='text-[140px] md:text-[180px] lg:text-[340px] xl:text-[380px] font-bold lg:leading-none	'>
            404
          </span>
          <img
            src={filmGrain}
            className='animate-resizeToHidden top-0 bottom-0 left-0 right-0 mx-auto w-3/4 lg:w-fit h-fit absolute'
          ></img>
        </div>
        <div className='flex flex-col gap-6 md:gap-10 lg:gap-12 mx-auto text-center lg:w-fit h-full lg:justify-center'>
          <div className='flex flex-col w-3/4 mx-auto text-center gap-6 md:gap-10'>
            <h3 className='text-3xl md:text-4xl lg:text-[50px] md:whitespace-nowrap'>
              Oops! You ran out of oxygen.
            </h3>
          </div>
          <p className='text-[16px] md:text-[20px] font-light tracking-wide w-3/4 mx-auto'>
            The page you&apos;re looking for is now beyond our reach. Let&apos;s get you..
          </p>
          <div className='font-semibold text-lg lg:p-2 flex flex-col md:block'>
            <span className='w-fit mx-auto md:mr-2'>Back Home in</span>
            <span className='w-fit mx-auto'>12</span>
          </div>
          <div className='uppercase text-xs'>home page</div>
        </div>
      </div>
    </div>
  );
}
