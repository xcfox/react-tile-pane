import { PanePosition } from '../../../..'

export function calcBarStyles(
  { top, left, width, height }: PanePosition,
  isRow?: boolean
) {
  return {
    top: top * 100 + '%',
    left: left * 100 + '%',
    width: isRow ? 10 : width * 100 + '%',
    height: isRow ? height * 100 + '%' : 10,
  }
}
