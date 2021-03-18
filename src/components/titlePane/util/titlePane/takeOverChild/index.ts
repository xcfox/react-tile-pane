import { isTileNodeIDs, TilePaneEntity } from '..'

export function takeOverChild(this: TilePaneEntity) {
  const { children, parent, indexInParent } = this
  if (!parent || !indexInParent) return
  if (isTileNodeIDs(parent.children)) return
  if (isTileNodeIDs(children)) return
  if (children.length === 1) {
    const oneChild = children[0]
    oneChild.parent = this
    this.children = oneChild.children
  }
}
