import { TileBranch } from '..'

export type TileNodeID = string

export interface TileBranchSubstance {
  id?: TileNodeID
  isRow?: boolean | undefined
  children: TileBranchSubstance[] | TileLeafSubstance[]
  grow?: number | undefined
}

export interface TileLeafSubstance {
  id?: TileNodeID
  onTab?: number
  children: TileNodeID[] | TileNodeID
  grow?: number | undefined
}

export interface TileNodeRect {
  top: number
  left: number
  width: number
  height: number
}

export type TileNodeConstructor = [
  id: string | undefined,
  parent: TileBranch | null,
  grow: number | undefined,
  rect: TileNodeRect | undefined
]
