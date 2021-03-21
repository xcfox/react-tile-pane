import React, { memo, useMemo, useReducer } from 'react'
import { MovingTabReducer, movingTabsReducer, TileBranchSubstance } from '../..'
import { initRootNode, reducer } from './controller'
import {
  MovingTabsContext,
  MovingTabsDispatchContext,
  StretchBarsContext,
  TileBranchesContext,
  TileDispatchContext,
  TileLeavesContext,
} from './data'
import { TileNodeReducer } from './typings'

export interface TileProviderProps {
  children?: React.ReactNode
  rootNode: TileBranchSubstance
}

const TileProviderInner: React.FC<TileProviderProps> = ({
  children,
  rootNode: rootNodeSub,
}: TileProviderProps) => {
  const [
    { branches, leaves, stretchBars },
    tileNodeDispatch,
  ] = useReducer<TileNodeReducer>(reducer, initRootNode(rootNodeSub))
  const [movingTabs, movingTabsDispatch] = useReducer<MovingTabReducer>(
    movingTabsReducer,
    []
  )
  const childrenMemo = useMemo(() => children, [children])
  return (
    <TileBranchesContext.Provider value={branches}>
      <TileLeavesContext.Provider value={leaves}>
        <StretchBarsContext.Provider value={stretchBars}>
          <TileDispatchContext.Provider value={tileNodeDispatch}>
            <MovingTabsContext.Provider value={movingTabs}>
              <MovingTabsDispatchContext.Provider value={movingTabsDispatch}>
                {childrenMemo}
              </MovingTabsDispatchContext.Provider>
            </MovingTabsContext.Provider>
          </TileDispatchContext.Provider>
        </StretchBarsContext.Provider>
      </TileLeavesContext.Provider>
    </TileBranchesContext.Provider>
  )
}

export const TileProvider = memo(TileProviderInner)
export * from './typings'
export * from './controller'
