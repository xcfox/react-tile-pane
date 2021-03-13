import { TilePaneEntity, calcChildPosition } from '../..'

export function reCalcChildrenPosition(
  this: TilePaneEntity,
  onlyChildren?: TilePaneEntity[]
) {
  const { children } = this
  if (children instanceof Array) {
    const grows = children.map((c) => c.grow)
    const childPositions = calcChildPosition(this, grows)
    children.forEach((pane, i) => {
      if (isNeedReCalc(pane)) {
        pane.position = childPositions[i]
        pane.reCalcChildrenPosition()
      }
    })
  }
  function isNeedReCalc(pane: TilePaneEntity): boolean {
    if (!onlyChildren) return true
    return onlyChildren.includes(pane)
  }
}
