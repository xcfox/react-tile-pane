import {
  TileBranch,
  TileBranchSubstance,
  TileLeaf,
  TileLeafSubstance,
  isTileLeaf,
} from '..'

export function leafDehydrate(this: TileLeaf): TileLeafSubstance {
  const { children, onTab, grow, id } = this
  return { children, onTab, grow, id }
}

export function branchDehydrate(this: TileBranch): TileBranchSubstance {
  const { children, isRow, grow, id } = this

  const childrenDehydrated = children.map((it) =>
    isTileLeaf(it) ? it.dehydrate() : it.dehydrate()
  )
  return { children: childrenDehydrated, isRow, grow, id }
}
