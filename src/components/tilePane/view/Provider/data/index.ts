import { createContext, Dispatch } from 'react'
import { TileNodeAction } from '..'
import {
  MovingTabAction,
  MovingTabs,
  StretchBarEntity,
  TileBranch,
  TileLeaf,
} from '../../..'

export const TileDispatchContext = createContext<Dispatch<TileNodeAction>>(
  (s) => s
)
export const TileBranchesContext = createContext<TileBranch[]>([])
export const TileLeavesContext = createContext<TileLeaf[]>([])
export const StretchBarsContext = createContext<StretchBarEntity[]>([])

export const MovingTabsContext = createContext<MovingTabs>([])
export const MovingTabsDispatchContext = createContext<
  React.Dispatch<MovingTabAction>
>((s) => s)
