import { calcChildGrows, calcChildRects } from '.'
import {
  TileBranch,
  TileBranchSubstance,
  TileLeaf,
  TileLeafSubstance,
  TileNodeID,
} from '..'
import { isTileLeaf } from '../helper'

export function leafSetChildren(this: TileLeaf, children: TileNodeID[]) {
  this.children = children
}

export function branchSetChildren(
  this: TileBranch,
  children: TileBranchSubstance[] | TileLeafSubstance[]
) {
  const grows = calcChildGrows(children)
  const rect = calcChildRects(this, grows)

  if (isTileLeaf(children)) {
    this.children = children.map(
      (it, i) =>
        new TileLeaf(
          it.onTab,
          it.children instanceof Array ? it.children : [it.children],
          it.id,
          this,
          grows[i],
          rect[i]
        )
    )
  } else {
    this.children = children.map(
      (it, i) =>
        new TileBranch(it.isRow, it.children, it.id, this, grows[i], rect[i])
    )
  }
}
