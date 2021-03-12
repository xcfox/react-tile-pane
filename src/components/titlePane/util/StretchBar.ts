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
   * @return {boolean} Did the move succeed?
   */
  move(distance: number): boolean {
    const lengthSum = this.parentPane.isRow
      ? this.parentPane.position.width
      : this.parentPane.position.height
    const offset = distance / lengthSum
    const isMoved = isValidGrow(this.previousPane.grow, this.nextPane.grow)
    if (isMoved) {
      this.previousPane.grow -= offset
      this.nextPane.grow += offset
      this.parentPane.reCalcChildrenPosition([this.previousPane, this.nextPane])
    }
    return isMoved
  }
}

function isValidGrow(growA: number, growB: number): boolean {
  if (growA < 0 || growB < 0) return false
  const growSum = growA + growB
  if (growA > growSum || growB > growSum) return false
  return true
}
