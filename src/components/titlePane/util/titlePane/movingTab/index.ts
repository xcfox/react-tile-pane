import { isTileNodeIDs, TilePaneEntity } from '..'
import { TileLeafID } from '../..'

export function startMovingTab(this: TilePaneEntity, id: TileLeafID) {
  const { children } = this
  if (!isTileNodeIDs(children)) return
  if (this.movingTabs.includes(id)) return
  return this.movingTabs.push(id)
}

export function endMovingTab(this: TilePaneEntity, id: TileLeafID) {
  const index = this.movingTabs.findIndex((it) => it === id)
  return this.movingTabs.splice(index, 1)
}
