import { createContext, Dispatch } from 'react'
import { TileNodeAction } from '..'
import { StretchBarEntity, TileBranch, TileLeaf } from '../../..'

export const TileDispatchContext = createContext<Dispatch<TileNodeAction>>(
  (s) => s
)
export const TileRootNodeContext = createContext<TileBranch>(
  (null as unknown) as TileBranch
)
export const TileBranchesContext = createContext<TileBranch[]>([])
export const TileLeavesContext = createContext<TileLeaf[]>([])
export const StretchBarsContext = createContext<StretchBarEntity[]>([])
