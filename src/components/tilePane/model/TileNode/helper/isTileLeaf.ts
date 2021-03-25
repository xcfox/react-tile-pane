import {
  TileBranch,
  TileBranchSubstance,
  TileLeaf,
  TileLeafSubstance,
} from '..'
import { PaneName } from '../../..'

export function isTileLeaf(
  node: TileLeafSubstance | TileBranchSubstance | TileLeaf | TileBranch
): node is TileLeafSubstance | TileLeaf {
  const { children = '0' } = node
  if (children instanceof Array) {
    return isTilePaneNames(children)
  }
  return true
}

export function isTilePaneNames(
  list:
    | PaneName[]
    | (TileBranchSubstance | TileLeafSubstance)[]
    | (TileLeaf | TileBranch)[]
    | TileLeafSubstance[]
    | TileBranchSubstance[]
    | TileLeaf[]
    | TileBranch[]
): list is PaneName[] {
  return !(list[0] instanceof Object)
}
