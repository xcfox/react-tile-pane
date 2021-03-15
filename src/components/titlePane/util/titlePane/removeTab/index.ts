import { isTileNodeIDs, TilePaneEntity } from '..'

export function removeTab(this: TilePaneEntity, index: number) {
  const { children } = this
  if (!isTileNodeIDs(children)) return
  const newChildren = children.slice()
  newChildren.splice(index, 1)
  if (newChildren.length === 0) {
    this.removeSelf()
    return
  }
  this.children = newChildren
}
