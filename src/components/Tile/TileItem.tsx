interface TileItemProps {
  imageSrc: string;
  targetRef: React.RefObject<HTMLDivElement>;
}

export type TileItem = (props: TileItemProps) => JSX.Element;

export function DefaultTileItem({ imageSrc }: TileItemProps) {
  return (
    <div className='w-screen h-screen max-h-screen'>
      <img className='w-full h-full object-cover' src={imageSrc} />
    </div>
  );
}

export function TargetTileItem({ imageSrc, targetRef }: TileItemProps) {
  return (
    <div className={`target w-screen h-screen max-h-screen relative shadow-xl`} ref={targetRef}>
      <img className='w-full h-full object-cover' src={imageSrc} />
      <div className='absolute top-0 left-0 w-full h-full shadowTarget' />
    </div>
  );
}
