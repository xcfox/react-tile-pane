import {
  TileBranch,
  TileBranchSubstance,
  TileLeaf,
  TileLeafSubstance,
  isTileLeaf,
} from '..'

export function leafDehydrate(this: TileLeaf): TileLeafSubstance {
  const { children, onTab, grow } = this
  return { children, onTab, grow }
}

export function branchDehydrate(this: TileBranch): TileBranchSubstance {
  const { children, isRow, grow } = this

  const childrenDehydrated = children.map((it) =>
    isTileLeaf(it) ? it.dehydrate() : it.dehydrate()
  )
  return { children: childrenDehydrated, isRow, grow }
}
