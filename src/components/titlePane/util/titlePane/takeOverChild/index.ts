import { TilePaneEntity } from '..'

export function takeOverChild(this: TilePaneEntity) {
  const { children, parent, indexInParent } = this
  if (!parent || !indexInParent) return
  if (!(parent.children instanceof Array)) return
  if (!(children instanceof Array)) return
  if (children.length === 1) {
    const oneChild = children[0]
    this.children = oneChild.children
  }
}
