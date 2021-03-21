import {
  TileBranch,
  TileLeaf,
  StretchBarEntity,
  isTileNodeIDs,
  isTileLeaf,
} from '..'

export function unfold(node: TileBranch) {
  const leaves: TileLeaf[] = []
  const branches = [node]
  const stretchBars: StretchBarEntity[] = []
  unfold(node)
  function unfold(pane: TileBranch) {
    const { children } = pane
    !isTileNodeIDs(children) &&
      (children as (TileBranch | TileLeaf)[]).forEach((p, i) => {
        if (!isTileLeaf(p)) {
          unfold(p)
          branches.push(p)
        } else {
          leaves.push(p)
        }
        const prevPane = children[i - 1]
        if (!prevPane) return
        const bar = new StretchBarEntity(pane, prevPane, p)
        stretchBars.push(bar)
      })
  }
  return {
    leaves,
    branches,
    stretchBars,
  }
}
