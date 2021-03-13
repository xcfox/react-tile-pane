import { isTileNodeIDs, TilePaneEntity } from '../..'

export function removeSelf(this: TilePaneEntity) {
  const { parent } = this
  if (!parent) return
  if (this.indexInParent === undefined) return
  if (isTileNodeIDs(parent.children)) return
  parent.children.splice(this.indexInParent, 1)
  parent.takeOverChild()
  parent.reCalcChildGrow()
  parent.reCalcChildrenPosition()
}
