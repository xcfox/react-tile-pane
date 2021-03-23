import { TileNode } from '../../..'

export type Into = 'top' | 'bottom' | 'left' | 'right' | 'center'
export type PaneWithPreBox = {
  targetPane: TileNode
  into: Into
}
