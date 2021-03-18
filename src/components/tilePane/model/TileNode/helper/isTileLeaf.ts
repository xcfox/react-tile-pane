import { TileBranchSubstance, TileLeafSubstance, TileNodeID } from '..'

export function isTileLeaf(
  children:
    | TileLeafSubstance[]
    | TileBranchSubstance[]
    | TileNodeID[]
    | TileNodeID
): children is TileLeafSubstance[] {
  if (children instanceof Array) {
    return !(children[0] instanceof Object)
  }
  return true
}
