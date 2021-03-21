import {
  TileBranch,
  TileBranchSubstance,
  TileLeaf,
  TileLeafSubstance,
} from '..'
import { TileLeafID } from '../../../..'

export function isTileLeaves(
  nodes: TileLeafSubstance[] | TileBranchSubstance[] | TileLeaf[] | TileBranch[]
): nodes is TileLeafSubstance[] | TileLeaf[] {
  const { children = '0' } = nodes[0]
  if (children instanceof Array) {
    return isTileNodeIDs(children)
  }
  return true
}
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
    | TileLeafID[]
    | TileLeafSubstance[]
    | TileBranchSubstance[]
    | TileLeaf[]
    | TileBranch[]
): list is TileLeafID[] {
  return !(list[0] instanceof Object)
}
