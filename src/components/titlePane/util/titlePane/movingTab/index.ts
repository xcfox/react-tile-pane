import { isTileNodeIDs, TilePaneEntity } from '..'
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

export function endMovingTab(this: TilePaneEntity, id: TileLeafID) {
  const { children } = this
  if (!isTileNodeIDs(children)) return
  const indexInChildren = children.findIndex((it) => it === id)
  const indexInMovingTabs = this.movingTabs.findIndex((it) => it === id)
  const newMovingTabs = this.movingTabs.slice()
  newMovingTabs.splice(indexInMovingTabs, 1)
  const newChildren = children.slice()
  newChildren.splice(indexInChildren, 1)
  this.movingTabs = newMovingTabs
  this.children = newChildren
  if (this.grow === 0) {
    this.removeSelf()
  }
}
