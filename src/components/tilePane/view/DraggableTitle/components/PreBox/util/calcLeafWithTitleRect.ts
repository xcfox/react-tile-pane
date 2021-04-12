import { RectReadOnly } from 'react-use-measure'
import { PaneName, TileLeaf, TileNodeRect } from '../../../../..'
import { absolute2Relative } from './absolute2Relative'

export interface LeafWithTitleRect {
  leaf: TileLeaf
  index: number
  title: PaneName
  titleRect: TileNodeRect
}

export function calcLeafWithTitleRect(
  titleRects: Record<PaneName, RectReadOnly>,
  leaves: TileLeaf[],
  containerRect: RectReadOnly
): LeafWithTitleRect[] {
  const leafWithTitleRects: LeafWithTitleRect[] = []
  leaves.forEach((leaf) => {
    leaf.children.forEach((title, index) => {
      const rect = titleRects[title]
      if (!rect) return
      const [left, top] = absolute2Relative(containerRect, rect.left, rect.top)
      const [right, bottom] = absolute2Relative(
        containerRect,
        rect.right,
        rect.bottom
      )
      const width = right - left
      const height = bottom - top
      leafWithTitleRects.push({
        leaf,
        title,
        index,
        titleRect: { top, left, width, height },
      })
    })
  })
  return leafWithTitleRects
}
