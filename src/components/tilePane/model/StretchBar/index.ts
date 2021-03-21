import { TileBranch, TileNode } from '..'
import { move } from './util'

export class StretchBarEntity {
  constructor(
    public parentPane: TileBranch,
    public previousPane: TileNode,
    public nextPane: TileNode
  ) {}
  rect = this.nextPane.rect
  move = move
}
