import { StretchBarEntity } from '..'

/**
 * @param {number} distance percentage in container
 * @return {boolean} Did the move succeed?
 */
export function move(this: StretchBarEntity, distance: number): boolean {
  const lengthSum = this.parentPane.isRow
    ? this.parentPane.rect.width
    : this.parentPane.rect.height
  const offset = distance / lengthSum
  const previousPaneGrow = this.previousPane.grow + offset
  const nextPaneGrow = this.nextPane.grow - offset
  const isMoved = isValidGrow(previousPaneGrow, nextPaneGrow)
  if (isMoved) {
    this.previousPane.grow = previousPaneGrow
    this.nextPane.grow = nextPaneGrow
    this.parentPane.setChildren(this.parentPane.children)
  }
  return isMoved
}

function isValidGrow(growA: number, growB: number): boolean {
  if (growA < 0.04 || growB < 0.04) return false
  const growSum = growA + growB
  if (growA > growSum || growB > growSum) return false
  return true
}
