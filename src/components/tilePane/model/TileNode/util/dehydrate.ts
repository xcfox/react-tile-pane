import {
  TileBranch,
  TileBranchSubstance,
  TileLeaf,
  TileLeafSubstance,
} from '..'
import { isTileLeaf } from '../helper'

export function leafDehydrate(this: TileLeaf): TileLeafSubstance {
  const { children, onTab, grow, id } = this
  return { children, onTab, grow, id }
}

export function branchDehydrate(this: TileBranch): TileBranchSubstance {
  const { children, isRow, grow, id } = this

  const childrenDehydrated = isTileLeaf(children)
    ? children.map((it) => it.dehydrate())
    : children.map((it) => it.dehydrate())
  return { children: childrenDehydrated, isRow, grow, id }
}
