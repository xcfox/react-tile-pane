import { TileBranchSubstance, TileLeafSubstance } from '..'
import { PaneName } from '../../..'
import { removeInArray, replaceInArray } from '../../../util'
import { isTileLeaf } from './isTileLeaf'

export function trimBranch<T extends TileBranchSubstance | TileLeafSubstance>(
  branch: T
): T {
  if (branch.children instanceof Array) {
    branch.children.forEach(
      (it: TileLeafSubstance | TileBranchSubstance | PaneName) =>
        it instanceof Object &&
        !isTileLeaf(it) &&
        trim(it, branch as TileBranchSubstance)
    )
  }
  return branch

  function trim(
    node: TileBranchSubstance | TileLeafSubstance,
    parent: TileBranchSubstance
  ) {
    if (node.children instanceof Array) {
      node.children.forEach(
        (it: TileLeafSubstance | TileBranchSubstance | PaneName) =>
          it instanceof Object &&
          !isTileLeaf(it) &&
          trim(it, node as TileBranchSubstance)
      )
      if (node.children.length === 0) {
        parent.children = removeInArray(parent.children, node)
      }
      if (node.children.length === 1) {
        const child = node.children[0]
        if (child instanceof Object) {
          parent.children = replaceInArray(parent.children, node, child)
        }
      }
    }
  }
}
