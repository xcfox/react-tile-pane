import React from 'react'
import { TileLeaf, TileNodeRect } from '../..'

export type PaneName = string | number

export type MovingTab = {
  name: PaneName
  leaf?: TileLeaf
  tabIndex: number
  leafIndex: number
}

export type TilePane = {
  name: PaneName
  child: React.ReactNode
}

export interface TilePaneWithRect {
  name: PaneName
  rect: TileNodeRect | null
}
