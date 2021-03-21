import {
  TileBranch,
  TileBranchSubstance,
  TileLeaf,
  TileLeafSubstance,
  isTileLeaves,
} from '..'

export function leafDehydrate(this: TileLeaf): TileLeafSubstance {
  const { children, onTab, grow, id } = this
  return { children, onTab, grow, id }
}

export function branchDehydrate(this: TileBranch): TileBranchSubstance {
  const { children, isRow, grow, id } = this

  const childrenDehydrated = isTileLeaves(children)
    ? children.map((it) => it.dehydrate())
    : children.map((it) => it.dehydrate())
  return { children: childrenDehydrated, isRow, grow, id }
}
