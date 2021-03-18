export type TileNodeID = string

export interface TileBranchSubstance {
  isRow?: boolean | undefined
  children: TileBranchSubstance[] | TileLeafSubstance[]
  grow?: number | undefined
}

export interface TileLeafSubstance {
  onTab?: number
  children: TileNodeID[] | TileNodeID
  grow?: number | undefined
}
