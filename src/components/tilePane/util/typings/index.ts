import React from 'react'
import { TileLeaf, TileNodeID, TileNodeRect } from '../..'

export type MovingTab = {
  id: TileNodeID
  leaf: TileLeaf
}

export type TilePane = {
  id: TileNodeID
  child: React.ReactNode
}

export interface TilePaneWithRect {
  id: TileNodeID
  rect: TileNodeRect | null
}
