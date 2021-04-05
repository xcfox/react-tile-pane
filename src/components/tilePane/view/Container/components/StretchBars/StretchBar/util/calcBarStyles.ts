import { TileNodeRect } from '../../../../../..'

export function calcBarStyles(
  { top, left, width, height }: TileNodeRect,
  isRow?: boolean
) {
  return {
    top: top * 100 + '%',
    left: left * 100 + '%',
    width: isRow ? undefined : width * 100 + '%',
    height: isRow ? height * 100 + '%' : undefined,
    transform: `translate${isRow ? 'X' : 'Y'}(-50%)`,
  }
}
