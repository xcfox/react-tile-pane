import {
  TileBranch,
  TileBranchSubstance,
  TileLeaf,
  TileLeafSubstance,
  TileNodeID,
} from '..'

export function isTileLeaf(
  node: TileLeafSubstance | TileBranchSubstance | TileLeaf | TileBranch
): node is TileLeafSubstance | TileLeaf {
  const { children = '0' } = node
  if (children instanceof Array) {
    return isTileNodeIDs(children)
  }
  return true
}

export function isTileNodeIDs(
  list:
    | TileNodeID[]
    | (TileBranchSubstance | TileLeafSubstance)[]
    | TileLeafSubstance[]
    | TileBranchSubstance[]
    | TileLeaf[]
    | TileBranch[]
): list is TileNodeID[] {
  return !(list[0] instanceof Object)
}
