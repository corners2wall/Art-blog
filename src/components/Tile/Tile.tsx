import { useAnimate } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { TileScope, TileWrapper, TileRow } from './TileNodes';
import { DefaultTileItem, TargetTileItem } from './TileItem';
import { generateTile, getScaleValue } from './utils';

interface TileProps {
  image: string;
}

export default function Tile({ image }: TileProps) {
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
          filter: ['brightness(60%)', 'brightness(90%)'],
        },
        { duration: 2 }
      ).then(() => {
        animate(
          '.shadowTarget',
          { boxShadow: 'inset 0px 0px 110px 45px rgba(0,0,0,0.50)' },
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
  });

  const tile = generateTile(8, DefaultTileItem, TargetTileItem);

  return (
    <TileScope scopeRef={scope}>
      <TileWrapper>
        {tile.map((tileItems, rowIndex) => (
          <TileRow key={rowIndex}>
            {tileItems.map((TileItem, itemIndex) => (
              <TileItem imageSrc={image} targetRef={targetRef} key={itemIndex} />
            ))}
          </TileRow>
        ))}
      </TileWrapper>
    </TileScope>
  );
}
