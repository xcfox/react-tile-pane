import { TilePaneEntity } from '.'

export class StretchBarEntity {
  constructor(
    public parentPane: TilePaneEntity,
    public previousPane: TilePaneEntity,
    public nextPane: TilePaneEntity
  ) {}
  position = this.nextPane.position
}
