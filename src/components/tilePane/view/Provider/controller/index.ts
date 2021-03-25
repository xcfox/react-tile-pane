import { TileStoreReducer } from '../..'
import { MovingTab, TileLeaf } from '../../..'
import { BarToMove, moveBar } from './moveBar'
import { startMovingTab, stopMovingTab, TabToStopMoving } from './MovingTab'
import { switchLeafTab } from './switchLeafTab'

export * from './initRootNode'

export type TileStoreAction = {
  leafToSwitchTab?: {
    leaf: TileLeaf
    onTab: number
  }
  tabToStopMoving?: TabToStopMoving
  tabToStartMoving?: MovingTab
  barToMove?: BarToMove
}

export const tileStoreReducer: TileStoreReducer = (
  state,
  { leafToSwitchTab, tabToStopMoving, tabToStartMoving, barToMove }
) => {
  if (leafToSwitchTab) return switchLeafTab(state, leafToSwitchTab)
  if (tabToStartMoving) return startMovingTab(state, tabToStartMoving)
  if (tabToStopMoving) return stopMovingTab(state, tabToStopMoving)
  if (barToMove) return moveBar(state, barToMove)
  return state
}
