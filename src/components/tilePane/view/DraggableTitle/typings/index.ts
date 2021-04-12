import { TileBranch, TileLeaf } from '../../..'

export type Into = 'top' | 'bottom' | 'left' | 'right' | 'center' | number
export type PaneWithPreBox = {
  targetNode: TileBranch | TileLeaf
  into: Into
}
