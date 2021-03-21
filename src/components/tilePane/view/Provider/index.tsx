import React, { memo, useMemo, useReducer } from 'react'
import { TileBranchSubstance } from '../..'
import { initRootNode, reducer } from './controller'
import {
  StretchBarsContext,
  TileBranchesContext,
  TileDispatchContext,
  TileLeavesContext,
  TileRootNodeContext,
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
    { rootNode, branches, leaves, stretchBars },
    dispatch,
  ] = useReducer<TileNodeReducer>(reducer, initRootNode(rootNodeSub))
  const childrenMemo = useMemo(() => children, [children])
  return (
    <TileRootNodeContext.Provider value={rootNode}>
      <TileBranchesContext.Provider value={branches}>
        <TileLeavesContext.Provider value={leaves}>
          <StretchBarsContext.Provider value={stretchBars}>
            <TileDispatchContext.Provider value={dispatch}>
              {childrenMemo}
            </TileDispatchContext.Provider>
          </StretchBarsContext.Provider>
        </TileLeavesContext.Provider>
      </TileBranchesContext.Provider>
    </TileRootNodeContext.Provider>
  )
}

export const TileProvider = memo(TileProviderInner)
export * from './typings'
export * from './controller'
