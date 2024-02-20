import Scrollable, { ScrollConfiguration } from '../Scrollable/Scrollable';

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

const targetTileScroll = '--tileScroll';

export function TargetTileItem({ imageSrc, targetRef }: TileItemProps) {
  return (
    <Scrollable
      className='target w-screen h-screen max-h-screen relative shadow-xl'
      style={{ filter: `brightness(calc(100% - var(${targetTileScroll})))` }}
      ref={targetRef}
      configuration={scrollableTile}
    >
      <img
        className='w-full h-full object-cover will-change-transform'
        src={imageSrc}
        style={{ transform: `translateY(calc(var(${targetTileScroll}) / 4))` }}
      />
      <div className='absolute top-0 left-0 w-full h-full shadowTarget' />
    </Scrollable>
  );
}

const scrollableTile: ScrollConfiguration<HTMLElement>[] = [
  {
    getStart: (node, position, meta) => position.top,
    getEnd: (node, position, meta) => position.top + position.height,
    mapTo: [0, 75],
    mutate: (node, value) => node.style.setProperty(targetTileScroll, `${value}%`),
  },
];
