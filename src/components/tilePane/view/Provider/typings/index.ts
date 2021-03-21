import { Reducer } from 'react'
import { StretchBarEntity, TileLeaf, TileBranch } from '../../..'

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
