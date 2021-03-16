import { Into, isTileNodeIDs, TilePaneEntity } from '..'
import { TileLeafID } from '../..'

export function insertLeaf(this: TilePaneEntity, id: TileLeafID, into: Into) {
  const { children, indexInParent = 0, parent, onTab } = this
  const isRow = parent?.isRow

  /**分割 */
  const segment = (isAfter: boolean) => {
    if (!parent) return
    const grow = this.grow / 2
    this.grow = grow
    const newPane = new TilePaneEntity({
      isRow,
      grow,
      children: [id],
      parent,
    })
    const i = isAfter ? indexInParent + 1 : indexInParent
    parent.children.splice(i, 0, newPane)
    parent.reCalcChildGrow()
    parent.reCalcChildrenPosition()
  }

  /**分裂 */
  const fission = (isAfter: boolean) => {
    const grow = 0.5
    const child = new TilePaneEntity({
      isRow,
      grow,
      children,
      onTab,
      parent: this,
    })
    const newPane = new TilePaneEntity({
      isRow,
      grow,
      children: [id],
      parent: this,
    })
    const newChildren = isAfter ? [child, newPane] : [newPane, child]
    this.children = newChildren
    this.reCalcChildGrow()
    this.reCalcChildrenPosition()
  }

  switch (into) {
    case 'center': {
      if (!isTileNodeIDs(children)) return
      const newChildren = children.slice()
      newChildren.push(id)
      this.children = newChildren
      this.onTab = newChildren.length - 1
      return
    }
    case 'left': {
      const isAfter = false
      if (isRow) {
        segment(isAfter)
      } else {
        fission(isAfter)
      }
      return
    }
    case 'right': {
      const isAfter = true
      if (isRow) {
        segment(isAfter)
      } else {
        fission(isAfter)
      }
      return
    }
    case 'top': {
      const isAfter = false
      if (isRow) {
        fission(isAfter)
      } else {
        segment(isAfter)
      }
      return
    }
    case 'bottom': {
      const isAfter = true
      if (isRow) {
        fission(isAfter)
      } else {
        segment(isAfter)
      }
      return
    }
  }
}
