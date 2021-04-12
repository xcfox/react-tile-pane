import { createContext, Dispatch } from 'react'
import useMeasure, { RectReadOnly } from 'react-use-measure'
import { TileStoreAction } from '..'
import {
  MovingTabAction,
  MovingTab,
  StretchBarEntity,
  TileBranch,
  TileLeaf,
} from '../../..'
import { Vector2 } from '../hook'

export const TileDispatchContext = createContext<Dispatch<TileStoreAction>>(
  (s) => s
)
export const TileBranchesContext = createContext<TileBranch[]>([])
export const TileLeavesContext = createContext<TileLeaf[]>([])
export const StretchBarsContext = createContext<StretchBarEntity[]>([])

export const MovingTabsContext = createContext<MovingTab[]>([])
export const MovingTabsDispatchContext = createContext<
  React.Dispatch<MovingTabAction>
>((s) => s)

export const ContainerRefContext = createContext<
  ReturnType<typeof useMeasure>[0]
>(() => null)

const defaultRect: RectReadOnly = {
  left: 0,
  top: 0,
  width: 0,
  height: 0,
  bottom: 0,
  right: 0,
  x: 0,
  y: 0,
}
export const ContainerRectContext = createContext(defaultRect)
export const MousePositionContext = createContext<Vector2>([0, 0])
export * from './TitleRects'
