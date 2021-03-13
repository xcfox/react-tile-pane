import { TilePaneEntity } from '../..'

export function removeSelf(this: TilePaneEntity) {
  const { parent } = this
  if (!parent) return
  if (this.indexInParent === undefined) return
  if (!(parent.children instanceof Array)) return
  parent.children.splice(this.indexInParent, 1)
  parent.takeOverChild()
  parent.reCalcChildGrow()
  parent.reCalcChildrenPosition()
}
