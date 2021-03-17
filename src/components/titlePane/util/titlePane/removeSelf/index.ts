import { isTileNodeIDs, TilePaneEntity } from '../..'

export function removeSelf(this: TilePaneEntity) {
  const { parent } = this
  if (!parent) return
  if (this.indexInParent === undefined) return
  if (isTileNodeIDs(parent.children)) return
  const newChildren = parent.children.slice()
  newChildren.splice(this.indexInParent, 1)
  parent.children = newChildren
  if (parent.children.length === 0) parent.removeSelf()
  parent.takeOverChild()
  parent.reCalcChildGrow()
  parent.reCalcChildrenPosition()
}
