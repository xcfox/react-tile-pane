import { TilePaneEntity } from '.'

export class StretchBarEntity {
  constructor(
    public parentPane: TilePaneEntity,
    public previousPane: TilePaneEntity,
    public nextPane: TilePaneEntity
  ) {}
  position = this.nextPane.position

  /**
   * @param {number} distance percentage in container
   */
  move(distance: number) {
    const lengthSum = this.parentPane.isRow
      ? this.parentPane.position.width
      : this.parentPane.position.height
    const offset = distance / lengthSum
    if (isValidGrow(this.previousPane.grow, this.nextPane.grow)) {
      this.previousPane.grow -= offset
      this.nextPane.grow += offset
      this.parentPane.reCalcChildrenPosition()
    }
  }
}

function isValidGrow(growA: number, growB: number): boolean {
  if (growA < 0 || growB < 0) return false
  const growSum = growA + growB
  if (growA > growSum || growB > growSum) return false
  return true
}
