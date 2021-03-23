import { Reducer } from 'react'
import {
  StretchBarEntity,
  TileLeaf,
  TileBranch,
  MovingTab,
  TileNodeID,
} from '../../..'

export type TileStore = {
  rootNode: TileBranch
  branches: TileBranch[]
  leaves: TileLeaf[]
  stretchBars: StretchBarEntity[]
  movingTabs: MovingTab[]
}

export type TileStoreAction = {
  leafToSwitchTab?: {
    leaf: TileLeaf
    onTab: number
  }
  tabToStopMoving?: TileNodeID
  tabToStartMoving?: MovingTab
}
export type TileStoreReducer = Reducer<TileStore, TileStoreAction>

export type MovingTabAction = {
  idToRemove?: TileNodeID
  tabToInsert?: MovingTab
}
export type MovingTabReducer = Reducer<MovingTab[], MovingTabAction>
