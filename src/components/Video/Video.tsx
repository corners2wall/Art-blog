import video from '../../assets/video.mp4';

export default function Video() {
  return (
    <video src={video} autoPlay muted className='fixed top-0 left-0 w-full h-full object-cover' />
  );
}
