import { PaneName } from '../..'
import {
  TileBranchSubstance,
  TileLeafSubstance,
  TileNodeConstructor,
  TileNodeRect,
} from './typings'
import { branchDehydrate, leafDehydrate } from './util'
import { branchSetChildren, leafSetChildren } from './util/setChildren'

export class TileNode {
  constructor(
    public readonly id: string = Math.random().toString(36),
    public readonly parent: TileBranch | null = null,
    public grow: number = 1,
    public rect: TileNodeRect = {
      top: 0,
      left: 0,
      width: 1,
      height: 1,
    }
  ) {}
}

export class TileLeaf extends TileNode {
  constructor(
    public onTab: number = 0,
    public children: PaneName[] = [],
    ...rest: TileNodeConstructor
  ) {
    super(...rest)
  }
  public setChildren = leafSetChildren
  public dehydrate = leafDehydrate
}

export class TileBranch extends TileNode {
  public children!: (TileBranch | TileLeaf)[]
  constructor(
    public isRow: boolean = false,
    children: (TileBranchSubstance | TileLeafSubstance)[],
    ...rest: TileNodeConstructor
  ) {
    super(...rest)
    this.setChildren(children)
  }

  public setChildren = branchSetChildren
  public dehydrate = branchDehydrate
}

export * from './typings'
export * from './helper'
