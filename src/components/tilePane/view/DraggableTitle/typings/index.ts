import { TileBranch, TileLeaf } from '../../..'

export type Into = 'top' | 'bottom' | 'left' | 'right' | 'center'
export type PaneWithPreBox = {
  branch?: { target: TileBranch; into: Into }
  leaf?: { target: TileLeaf; into: Into }
  tab?: { target: TileLeaf; into: number; isEnd: boolean }
}
