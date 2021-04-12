import { PaneName, TileLeaf, TileNodeRect } from '../../../../..'

export interface LeafWithTitleRect {
  leaf: TileLeaf
  index: number
  title: PaneName
  rect: TileNodeRect
}

export function calcLeafWithTitleRect(
  titleRects: Record<PaneName, TileNodeRect>,
  leaves: TileLeaf[]
): LeafWithTitleRect[] {
  const leafWithTitleRects: LeafWithTitleRect[] = []
  leaves.forEach((leaf) => {
    leaf.children.forEach((title, index) => {
      const rect = titleRects[title]
      if (!rect) return
      leafWithTitleRects.push({
        leaf,
        title,
        index,
        rect,
      })
    })
  })
  return leafWithTitleRects
}
