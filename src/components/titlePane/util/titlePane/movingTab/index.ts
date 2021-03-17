import { isTileNodeIDs, PaneWithPreBox, TilePaneEntity } from '..'
import { TileLeafID } from '../..'

export function startMovingTab(this: TilePaneEntity, id: TileLeafID) {
  const { children } = this
  if (!isTileNodeIDs(children)) return
  if (this.movingTabs.includes(id)) return
  const newMovingTabs = this.movingTabs.slice()
  newMovingTabs.push(id)
  this.movingTabs = newMovingTabs
  if (this.movingTabs.length === this.children.length) {
    this.grow = 0
    this.parent?.reCalcChildGrow()
    this.parent?.reCalcChildrenPosition()
  }
}

export function endMovingTab(
  this: TilePaneEntity,
  id: TileLeafID,
  paneWithPreBox?: PaneWithPreBox
) {
  const { children } = this
  if (!isTileNodeIDs(children)) return
  const indexInMovingTabs = this.movingTabs.findIndex((it) => it === id)
  const newMovingTabs = this.movingTabs.slice()
  newMovingTabs.splice(indexInMovingTabs, 1)
  this.movingTabs = newMovingTabs

  const indexInChildren = children.findIndex((it) => it === id)
  const newChildren = children.slice()
  newChildren.splice(indexInChildren, 1)
  const isTakeOvered = this.parent?.children[0] === paneWithPreBox?.targetPane
  this.children = newChildren
  if (this.grow === 0) {
    this.removeSelf()
  }
  const isOneChild = (this.parent?.children.length ?? 0) === 1
  if (paneWithPreBox) {
    const { targetPane, into } = paneWithPreBox
    const pane = isTakeOvered && isOneChild ? targetPane.parent : targetPane
    pane?.insertLeaf(id, into)
  }
}
