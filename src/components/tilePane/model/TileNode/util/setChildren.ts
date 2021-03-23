import { calcChildGrows, calcChildRects } from '.'
import {
  TileBranch,
  TileBranchSubstance,
  TileLeaf,
  TileLeafSubstance,
} from '..'
import { PaneName } from '../../../util'
import { isTileLeaf } from '../helper'

export function leafSetChildren(this: TileLeaf, children: PaneName[]) {
  this.children = children
}

export function branchSetChildren(
  this: TileBranch,
  children: (TileBranchSubstance | TileLeafSubstance)[]
) {
  const grows = calcChildGrows(children)
  const rect = calcChildRects(this, grows)
  this.children = children.map((it, i) =>
    isTileLeaf(it)
      ? new TileLeaf(
          it.onTab,
          it.children instanceof Array ? it.children : [it.children],
          it.id,
          this,
          grows[i],
          rect[i]
        )
      : new TileBranch(it.isRow, it.children, it.id, this, grows[i], rect[i])
  )
}
