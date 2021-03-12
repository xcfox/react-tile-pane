import { TilePaneEntity } from '..'
import { move } from './move'

export class StretchBarEntity {
  constructor(
    public parentPane: TilePaneEntity,
    public previousPane: TilePaneEntity,
    public nextPane: TilePaneEntity
  ) {}
  position = this.nextPane.position
  move = move
}
