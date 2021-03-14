import { isTileNodeIDs, TilePaneEntity } from '..'

export function removeTab(this: TilePaneEntity, index: number) {
  const { children } = this
  if (!isTileNodeIDs(children)) return
  const newChildren = children.slice().splice(index, 1)
  children.splice(index, 1)
  if (children.length === 0) {
    this.removeSelf()
    return
  }
  this.children = newChildren
}
