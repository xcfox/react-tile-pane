import {
  isTileNodeIDs,
  PanePosition,
  TilePaneBranch,
  TilePaneEntity,
  TilePaneLeaf,
} from '.'

const branchProportion = 0.15
const leafProportion = 0.3

export type Into = 'top' | 'bottom' | 'left' | 'right' | 'center'

export function calcPreBox(
  panes: TilePaneEntity[],
  innerPosition: [number, number] | undefined
):
  | {
      pane: TilePaneEntity
      into: Into
    }
  | undefined {
  if (!innerPosition) return
  const [x, y] = innerPosition
  const branches = panes.filter(
    (p) => !isTileNodeIDs(p.children)
  ) as TilePaneBranch[]
  for (const pane of branches) {
    if (isInPane(pane.position, innerPosition)) {
      const { left, top, width, height } = pane.position
      if (pane.isRow) {
        if (y - top < height * branchProportion) {
          return { pane, into: 'top' }
        }
        if (top + height - y < height * branchProportion) {
          return { pane, into: 'bottom' }
        }
      } else {
        if (x - left < width * branchProportion) {
          return { pane, into: 'left' }
        }
        if (left + width - x < width * branchProportion) {
          return { pane, into: 'right' }
        }
      }
    } else console.log(innerPosition, 'not in ', pane.position)
  }

  const leaves = panes.filter((p) =>
    isTileNodeIDs(p.children)
  ) as TilePaneLeaf[]
  for (const pane of leaves) {
    if (isInPane(pane.position, innerPosition)) {
      const { left, top, width, height } = pane.position
      if (x - left < width * leafProportion) {
        return { pane, into: 'left' }
      }
      if (left + width - x < width * leafProportion) {
        return { pane, into: 'right' }
      }
      if (y - top < height * leafProportion) {
        return { pane, into: 'top' }
      }
      if (top + height - y < height * leafProportion) {
        return { pane, into: 'bottom' }
      }
      return { pane, into: 'center' }
    }
  }
}

function isInPane(position: PanePosition, [x, y]: [number, number]) {
  const { left, top, width, height } = position
  return left < x && x < left + width && top < y && y < top + height
}
