import getImageUrl from '../../utils/getImageUrl';
import { PropsWithChildren, useEffect, useRef } from 'react';
import { motion, useAnimate } from 'framer-motion';

const background = getImageUrl('background', 'jpg');

const getScaleValue = (value: number, scale: number) => value * (1 / (1 - scale));

interface TileItemProps {
  imageSrc: string;
  targetRef: React.RefObject<HTMLDivElement>;
}

type TileItem = (props: TileItemProps) => JSX.Element;

function DefaultTileItem({ imageSrc }: TileItemProps) {
  return (
    <div className='w-screen h-screen max-h-screen'>
      <img className='w-full h-full object-cover' src={imageSrc} />
    </div>
  );
}

function TargetTileItem({ imageSrc, targetRef }: TileItemProps) {
  return (
    <div className={`target w-screen h-screen max-h-screen relative shadow-xl`} ref={targetRef}>
      <img className='w-full h-full object-cover' src={imageSrc} />
      <div className='absolute top-0 left-0 w-full h-full shadowTarget' />
    </div>
  );
}

// ref: https://www.somefolk.co.uk/
export default function Custom() {
  const targetRef = useRef<HTMLDivElement>(null);

  const [scope, animate] = useAnimate<HTMLDivElement>();

  useEffect(() => {
    if (targetRef.current) {
      const { x, width, y } = targetRef.current.getBoundingClientRect();

      const leftOffset = getScaleValue(x, 0.5);
      const topOffset = getScaleValue(y, 0.5);

      length = x - width / 2;

      animate(
        scope.current,
        {
          transform: `translate(${-length}px) scale(0.5)`,
          opacity: [0, 1],
          filter: ['brightness(60%)', 'brightness(85%)'],
        },
        { duration: 2 }
      ).then(() => {
        animate(
          '.shadowTarget',
          { boxShadow: 'inset 0px 0px 113px 43px rgba(0,0,0,0.53)' },
          { duration: 1.5 }
        );
        animate(
          scope.current,
          {
            transform: `translate(-${leftOffset}px, -${topOffset}px) scale(1)`,
            filter: 'brightness(50%)',
          },
          { duration: 1.5 }
        );
      });
    }
  }, []);

  const tile = generateTile(8, DefaultTileItem, TargetTileItem);

  return (
    <div className='overflow-hidden bg-[#333333]'>
      <motion.div className='scale-50 w-screen h-screen origin-top-left	' ref={scope}>
        <TileWrapper>
          {tile.map((tileItems) => (
            <TileRow>
              {tileItems.map((TileItem) => (
                <TileItem imageSrc={background} targetRef={targetRef} />
              ))}
            </TileRow>
          ))}
        </TileWrapper>
      </motion.div>
    </div>
  );
}

function TileRow({ children }: PropsWithChildren) {
  return <div className='flex gap-5'>{children}</div>;
}

function TileWrapper({ children }: PropsWithChildren) {
  return (
    <div className='absolute -left-1/2 -top-2/4 flex flex-col items-center gap-5'>{children}</div>
  );
}

function generateTile(
  itemsCount: number,
  renderDefaultItem: TileItem,
  renderTargetItem: TileItem
): TileItem[][] {
  const mainRow = new Array<TileItem>(itemsCount - 1)
    .fill(renderDefaultItem)
    .map((Item, index, arr) => (index === arr.length - 2 ? renderTargetItem : Item));

  const additionalRow = new Array<TileItem>(itemsCount).fill(renderDefaultItem);

  return [additionalRow, mainRow, additionalRow];
}
