export default function Footer() {
  return (
    <footer className='pb-5 pt-20 bg-slate-50 px-5'>
      <div className='grid grid-cols-12	gap-3'>
        <div className='col-span-2'>
          <span className='font-semibold'>① LINKS</span>
        </div>
        <div className='col-span-2'>
          <span className='font-semibold'>② FOLLOW</span>
        </div>
        <div className='col-span-2'>
          <span className='font-semibold'>③ CONTACT</span>
        </div>
        <div className='col-start-9 col-end-12'>
          <span className='font-semibold'>④ NEWSLETTER</span>
        </div>
      </div>
    </footer>
  );
}
