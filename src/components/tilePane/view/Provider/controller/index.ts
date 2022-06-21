import { initRootNode, TileStoreReducer } from '../..'
import { MovingTab, TileBranchSubstance, TileLeaf } from '../../..'
import { BarToMove, moveBar } from './moveBar'
import { startMovingTab, stopMovingTab, TabToStopMoving } from './MovingTab'
import { switchLeafTab } from './switchLeafTab'

export * from './initRootNode'

export type TileStoreAction = {
  leafToSwitchTab?: {
    leaf: TileLeaf
    onTab: number
  }
  leafToCloseTab?: Pick<MovingTab, 'name' | 'leaf'>
  tabToStopMoving?: TabToStopMoving
  tabToStartMoving?: Pick<MovingTab, 'name' | 'leaf'>
  barToMove?: BarToMove
  reset?: TileBranchSubstance
}

export const tileStoreReducer: TileStoreReducer = (
  state,
  {
    leafToSwitchTab,
    tabToStopMoving,
    tabToStartMoving,
    barToMove,
    leafToCloseTab,
    reset,
  }
) => {
  if (leafToSwitchTab) return switchLeafTab(state, leafToSwitchTab)
  if (leafToCloseTab) return startMovingTab(state, leafToCloseTab, true)
  if (tabToStartMoving) return startMovingTab(state, tabToStartMoving)
  if (tabToStopMoving) return stopMovingTab(state, tabToStopMoving)
  if (barToMove) return moveBar(state, barToMove)
  if (reset)
    return {
      movingTabs: [],
      ...initRootNode(reset),
    }
  return state
}
