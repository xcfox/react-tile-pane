import { TileNodeReducer } from '../..'
import { startMovingTab, stopMovingTab } from './MovingTab'
import { switchLeafTab } from './switchLeafTab'

export * from './initRootNode'

export const tileNodeReducer: TileNodeReducer = (
  state,
  { leafToSwitchTab, tabToStopMoving, tabToStartMoving }
) => {
  if (leafToSwitchTab) return switchLeafTab(state, leafToSwitchTab)
  if (tabToStopMoving) return stopMovingTab(state, tabToStopMoving)
  if (tabToStartMoving) return startMovingTab(state, tabToStartMoving)
  return state
}
