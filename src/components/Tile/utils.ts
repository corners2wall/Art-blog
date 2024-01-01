import { TileItem } from './TileItem';

export function generateTile(
  itemsCount: number,
  renderDefaultItem: TileItem,
  renderTargetItem: TileItem
): TileItem[][] {
  debugger;
  const mainRow = new Array<TileItem>(itemsCount - 1)
    .fill(renderDefaultItem)
    .map((Item, index, arr) => (index === arr.length - 2 ? renderTargetItem : Item));

  const additionalRow = new Array<TileItem>(itemsCount).fill(renderDefaultItem);

  return [additionalRow, mainRow, additionalRow];
}

export const getScaleValue = (value: number, scale: number) => value * (1 / (1 - scale));
