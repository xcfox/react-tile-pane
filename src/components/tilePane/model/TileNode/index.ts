import { isTileLeaf } from './helper'
import { TileBranchSubstance, TileLeafSubstance, TileNodeID } from './typings'
import { calcChildGrows } from './util'

export class TileNode {
  constructor(
    public readonly id: string = Math.random().toLocaleString(),
    public readonly parent: TileBranch | null = null,
    public grow: number = 1
  ) {}
}

export class TileLeaf extends TileNode {
  constructor(
    id: string | undefined,
    parent: TileBranch | null,
    grow: number | undefined,
    public onTab: number = 0,
    public children: TileNodeID[] = []
  ) {
    super(id, parent, grow)
  }
}

export class TileBranch extends TileNode {
  children: TileBranch[] | TileLeaf[]
  constructor(
    id: string | undefined,
    parent: TileBranch | null,
    grow: number | undefined,
    public isRow: boolean = false,
    children: TileBranchSubstance[] | TileLeafSubstance[] = []
  ) {
    super(id, parent, grow)
    const grows = calcChildGrows(children)
    if (isTileLeaf(children)) {
      this.children = children.map(
        (it, i) =>
          new TileLeaf(
            undefined,
            this,
            grows[i],
            it.onTab,
            it.children instanceof Array ? it.children : [it.children]
          )
      )
    } else {
      this.children = children.map(
        (it, i) =>
          new TileBranch(undefined, this, grows[i], it.isRow, it.children)
      )
    }
  }
}

export * from './typings'
