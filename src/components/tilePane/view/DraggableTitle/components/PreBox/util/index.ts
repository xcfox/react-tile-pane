import { TileBranch, TileLeaf, TileNodeRect } from '../../../../..'
import { PaneWithPreBox } from '../../../typings'
import { LeafWithTitleRect } from './calcLeafWithTitleRect'

const branchProportion = 0.05
const leafProportion = 0.3
export function calcPreBox(
  branches: TileBranch[],
  leaves: TileLeaf[],
  leafWithTitleRects: LeafWithTitleRect[],
  innerPosition: [number, number]
): PaneWithPreBox | undefined {
  if (!innerPosition) return
  const [x, y] = innerPosition

  for (const { leaf, rect: titleRect, index } of leafWithTitleRects) {
    if (isInPane(titleRect, innerPosition)) {
      const isEnd = titleRect.left + titleRect.width / 2 < x
      return {
        tab: {
          target: leaf,
          into: index,
          isEnd,
        },
      }
    }
  }

  for (const pane of branches) {
    if (isInPane(pane.rect, innerPosition)) {
      const { left, top, width, height } = pane.rect
      if (pane.isRow) {
        if (y - top < height * branchProportion) {
          return { branch: { target: pane, into: 'top' } }
        }
        if (top + height - y < height * branchProportion) {
          return { branch: { target: pane, into: 'bottom' } }
        }
      } else {
        if (x - left < width * branchProportion) {
          return { branch: { target: pane, into: 'left' } }
        }
        if (left + width - x < width * branchProportion) {
          return { branch: { target: pane, into: 'right' } }
        }
      }
    }
  }

  for (const pane of leaves) {
    if (isInPane(pane.rect, innerPosition)) {
      const { left, top, width, height } = pane.rect
      if (x - left < width * leafProportion) {
        return { leaf: { target: pane, into: 'left' } }
      }
      if (left + width - x < width * leafProportion) {
        return { leaf: { target: pane, into: 'right' } }
      }
      if (y - top < height * leafProportion) {
        return { leaf: { target: pane, into: 'top' } }
      }
      if (top + height - y < height * leafProportion) {
        return { leaf: { target: pane, into: 'bottom' } }
      }
      return { leaf: { target: pane, into: 'center' } }
    }
  }
}

function isInPane(position: TileNodeRect, [x, y]: [number, number]) {
  const { left, top, width, height } = position
  return left < x && x < left + width && top < y && y < top + height
}

export * from './calcBoxPosition'
export * from './calcLeafWithTitleRect'
