import { isTileNodeIDs, TilePaneEntity } from '..'
import { TileNode } from '../..'

export function removeTab(this: TilePaneEntity, node: TileNode) {
  const { children } = this
  if (!isTileNodeIDs(children)) return
  const index = children.findIndex((it) => it === node.id)
  const newChildren = children.slice().splice(index, 1)
  children.splice(index, 1)
  if (children.length === 0) {
    this.removeSelf()
    return
  }
  this.children = newChildren
}
