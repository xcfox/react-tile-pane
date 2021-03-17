import { Into, isTileNodeIDs, TilePaneEntity } from '..'
import { TileLeafID } from '../..'

export function insertLeaf(this: TilePaneEntity, id: TileLeafID, into: Into) {
  const { children, indexInParent = 0, parent, onTab, isRow } = this

  /** 分割 ——插入同级节点 */
  const segment = (isNext: boolean) => {
    if (!parent) return
    const grow = this.grow / 2
    this.grow = grow
    const newPane = new TilePaneEntity({
      grow,
      children: id,
      parent,
    })
    const i = isNext ? indexInParent + 1 : indexInParent
    const newChildren = parent.children.slice()
    newChildren.splice(i, 0, newPane)
    parent.children = newChildren
    parent.reCalcChildGrow()
    parent.reCalcChildrenPosition()
  }

  /** 分裂 ——插入子级节点*/
  const fission = (isNext: boolean) => {
    const grow = 0.5
    const child = new TilePaneEntity({
      isRow,
      grow,
      children,
      onTab,
      parent: this,
    })
    const newPane = new TilePaneEntity({
      grow,
      children: id,
      parent: this,
    })
    const newChildren = isNext ? [child, newPane] : [newPane, child]
    this.children = newChildren
    this.isRow = ['left', 'right'].includes(into)
    this.reCalcChildGrow()
    this.reCalcChildrenPosition()
  }

  if (into === 'center') {
    if (!isTileNodeIDs(children)) return
    const newChildren = children.slice()
    newChildren.push(id)
    this.children = newChildren
    this.onTab = newChildren.length - 1
    return
  }
  const isNext = ['right', 'bottom'].includes(into)
  const isLeaf = isTileNodeIDs(children)
  const isSegmental = isSegment(this, isLeaf, into)
  if (isSegmental) segment(isNext)
  else fission(isNext)
}

function isSegment(pane: TilePaneEntity, isLeaf: boolean, into: Into): boolean {
  if (!isLeaf) return false
  const isRow = pane.parent?.isRow
  const segmentInto: Into[] = isRow ? ['left', 'right'] : ['top', 'bottom']
  return segmentInto.includes(into)
}
