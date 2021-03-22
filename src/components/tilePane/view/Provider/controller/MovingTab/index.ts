import { TileStore } from '../..'
import { MovingTab, TileNodeID } from '../../../..'

export function startMovingTab(
  { movingTabs, ...rest }: TileStore,
  tabToStopMoving: MovingTab
): TileStore {
  const newMovingTabs = movingTabs.slice()
  const { name } = tabToStopMoving
  const existedTab = newMovingTabs.find((it) => (it.name = name))
  if (!existedTab) {
    newMovingTabs.push(tabToStopMoving)
  }
  return { movingTabs: newMovingTabs, ...rest }
}

export function stopMovingTab(
  { movingTabs, ...rest }: TileStore,
  tabToStopMoving: TileNodeID
): TileStore {
  const newMovingTabs = movingTabs.slice()
  const index = newMovingTabs.findIndex((it) => (it.name = tabToStopMoving))
  newMovingTabs.splice(index, 1)
  return { movingTabs: newMovingTabs, ...rest }
}
