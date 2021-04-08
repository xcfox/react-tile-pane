import { TileBranch, TileLeaf, TileNodeRect } from '../../..'
import { PaneWithPreBox } from '../typings'

const branchProportion = 0.05
const leafProportion = 0.3
export function calcPreBox(
  branches: TileBranch[],
  leaves: TileLeaf[],
  innerPosition: [number, number]
): PaneWithPreBox | undefined {
  if (!innerPosition) return
  const [x, y] = innerPosition
  for (const pane of branches) {
    if (isInPane(pane.rect, innerPosition)) {
      const { left, top, width, height } = pane.rect
      if (pane.isRow) {
        if (y - top < height * branchProportion) {
          return { targetNode: pane, into: 'top' }
        }
        if (top + height - y < height * branchProportion) {
          return { targetNode: pane, into: 'bottom' }
        }
      } else {
        if (x - left < width * branchProportion) {
          return { targetNode: pane, into: 'left' }
        }
        if (left + width - x < width * branchProportion) {
          return { targetNode: pane, into: 'right' }
        }
      }
    }
  }

  for (const pane of leaves) {
    if (isInPane(pane.rect, innerPosition)) {
      const { left, top, width, height } = pane.rect
      if (x - left < width * leafProportion) {
        return { targetNode: pane, into: 'left' }
      }
      if (left + width - x < width * leafProportion) {
        return { targetNode: pane, into: 'right' }
      }
      if (y - top < height * leafProportion) {
        return { targetNode: pane, into: 'top' }
      }
      if (top + height - y < height * leafProportion) {
        return { targetNode: pane, into: 'bottom' }
      }
      return { targetNode: pane, into: 'center' }
    }
  }
}

function isInPane(position: TileNodeRect, [x, y]: [number, number]) {
  const { left, top, width, height } = position
  return left < x && x < left + width && top < y && y < top + height
}

export function orFn<As extends unknown[], T = unknown>(
  orFunc: T | ((...args: As) => T),
  ...args: As
) {
  return typeof orFunc === 'function'
    ? (orFunc as (...args: As) => T)(...args)
    : orFunc
}
