import { isTileNodeIDs, TileBranch, TileLeaf, TileNode } from '..'
import { StretchBarEntity } from '../..'
import { isTileLeaf } from '.'

export function unfold(node: TileBranch) {
  const nodes: TileNode[] = [node]
  const stretchBars: StretchBarEntity[] = []
  unfold(node)
  function unfold(pane: TileBranch) {
    const { children } = pane
    !isTileNodeIDs(children) &&
      (children as (TileBranch | TileLeaf)[]).forEach((p, i) => {
        if (!isTileLeaf(p)) unfold(p)
        nodes.push(p)
        const prevPane = children[i - 1]
        if (!prevPane) return
        const bar = new StretchBarEntity(pane, prevPane, p)
        stretchBars.push(bar)
      })
  }
  return {
    nodes,
    stretchBars,
  }
}
