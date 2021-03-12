import { PanePosition } from '../../../..'

const thickness = 10

export function calcBarStyles(
  { top, left, width, height }: PanePosition,
  isRow?: boolean
) {
  return {
    top: isRow ? top * 100 + '%' : `calc(${top * 100}% - ${thickness}px)`,
    left: isRow ? `calc(${left * 100}% - ${thickness}px)` : left * 100 + '%',
    width: isRow ? thickness : width * 100 + '%',
    height: isRow ? height * 100 + '%' : thickness,
  }
}
