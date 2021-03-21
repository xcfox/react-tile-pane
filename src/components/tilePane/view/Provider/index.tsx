import React, { memo, useMemo, useReducer } from 'react'
import useMeasure from 'react-use-measure'
import {
  MovingTabReducer,
  movingTabsReducer,
  TileBranchSubstance,
  TilePane,
} from '../..'
import { initRootNode, reducer } from './controller'
import {
  ContainerRectContext,
  ContainerRefContext,
  MovingTabsContext,
  MovingTabsDispatchContext,
  StretchBarsContext,
  TileBranchesContext,
  TileDispatchContext,
  TileLeavesContext,
  TitlePanesContext,
} from './data'
import { TileNodeReducer } from './typings'

export interface TileProviderProps {
  children?: React.ReactNode
  rootNode: TileBranchSubstance
  tilePanes: TilePane[]
}

const TileProviderInner: React.FC<TileProviderProps> = ({
  children,
  rootNode: rootNodeSub,
  tilePanes,
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
  const [targetRef, containerRect] = useMeasure({ scroll: true })
  return (
    <MovingTabsDispatchContext.Provider value={movingTabsDispatch}>
      <ContainerRefContext.Provider value={targetRef}>
        <TitlePanesContext.Provider value={tilePanes}>
          <ContainerRectContext.Provider value={containerRect}>
            <TileBranchesContext.Provider value={branches}>
              <TileLeavesContext.Provider value={leaves}>
                <StretchBarsContext.Provider value={stretchBars}>
                  <TileDispatchContext.Provider value={tileNodeDispatch}>
                    <MovingTabsContext.Provider value={movingTabs}>
                      {childrenMemo}
                    </MovingTabsContext.Provider>
                  </TileDispatchContext.Provider>
                </StretchBarsContext.Provider>
              </TileLeavesContext.Provider>
            </TileBranchesContext.Provider>
          </ContainerRectContext.Provider>
        </TitlePanesContext.Provider>
      </ContainerRefContext.Provider>
    </MovingTabsDispatchContext.Provider>
  )
}

export const TileProvider = memo(TileProviderInner)
export * from './typings'
export * from './controller'
export * from './data'
