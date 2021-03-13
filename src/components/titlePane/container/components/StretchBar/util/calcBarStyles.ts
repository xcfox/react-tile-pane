import { PanePosition } from '../../../..'

export function calcBarStyles(
  { top, left, width, height }: PanePosition,
  thickness: number,
  isRow?: boolean
) {
  return {
    top: isRow ? top * 100 + '%' : `calc(${top * 100}% - ${thickness / 2}px)`,
    left: isRow
      ? `calc(${left * 100}% - ${thickness / 2}px)`
      : left * 100 + '%',
    width: isRow ? thickness : width * 100 + '%',
    height: isRow ? height * 100 + '%' : thickness,
  }
}
