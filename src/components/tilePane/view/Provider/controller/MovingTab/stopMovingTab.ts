import { TileStore } from '../..'
import { PaneName } from '../../../..'

export function stopMovingTab(
  { movingTabs, ...rest }: TileStore,
  tabToStopMoving: PaneName
): TileStore {
  const newMovingTabs = movingTabs.slice()
  const index = newMovingTabs.findIndex((it) => (it.name = tabToStopMoving))
  newMovingTabs.splice(index, 1)
  return { movingTabs: newMovingTabs, ...rest }
}
