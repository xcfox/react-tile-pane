import { TileStoreReducer } from '../..'
import { MovingTab, TileLeaf, PaneName } from '../../..'
import { startMovingTab, stopMovingTab } from './MovingTab'
import { switchLeafTab } from './switchLeafTab'

export * from './initRootNode'

export type TileStoreAction = {
  leafToSwitchTab?: {
    leaf: TileLeaf
    onTab: number
  }
  tabToStopMoving?: PaneName
  tabToStartMoving?: MovingTab
  paneToRemove?: PaneName
  paneToInsert?: PaneName
}

export const tileStoreReducer: TileStoreReducer = (
  state,
  { leafToSwitchTab, tabToStopMoving, tabToStartMoving }
) => {
  if (leafToSwitchTab) return switchLeafTab(state, leafToSwitchTab)
  if (tabToStartMoving) return startMovingTab(state, tabToStartMoving)
  if (tabToStopMoving) return stopMovingTab(state, tabToStopMoving)
  return state
}
