import { Reducer } from 'react'
import {
  StretchBarEntity,
  TileLeaf,
  TileBranch,
  MovingTab,
  TileNodeID,
} from '../../..'

export type TileNodeStore = {
  rootNode: TileBranch
  branches: TileBranch[]
  leaves: TileLeaf[]
  stretchBars: StretchBarEntity[]
}

export type TileNodeAction = {
  type: string
}
export type TileNodeReducer = Reducer<TileNodeStore, TileNodeAction>

export type MovingTabs = MovingTab[]
export type MovingTabAction = {
  idToRemove?: TileNodeID
  tabToInsert?: MovingTab
}
export type MovingTabReducer = Reducer<MovingTabs, MovingTabAction>
