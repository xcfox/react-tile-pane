import React, { memo, useMemo, useReducer } from 'react'
import useMeasure from 'react-use-measure'
import { TileBranchSubstance, TilePane } from '../..'
import {
  TitlePanesContext,
  ContainerRectContext,
  ContainerRefContext,
  MovingTabsContext,
  StretchBarsContext,
  TileBranchesContext,
  TileDispatchContext,
  TileLeavesContext,
  TileStoreReducer,
  initRootNode,
  TabsBarContext,
  tileStoreReducer,
  TabsBarConfig,
  defaultTabsBarConfig,
} from '.'

export interface TileProviderProps {
  children?: React.ReactNode
  rootNode: TileBranchSubstance
  tilePanes: TilePane[]
  TabBar?: TabsBarConfig
}

const TileProviderInner: React.FC<TileProviderProps> = ({
  children,
  rootNode: rootNodeSub,
  tilePanes,
  TabBar = defaultTabsBarConfig,
}: TileProviderProps) => {
  const [
    { branches, leaves, stretchBars, movingTabs },
    tileStoreDispatch,
  ] = useReducer<TileStoreReducer>(tileStoreReducer, {
    movingTabs: [],
    ...initRootNode(rootNodeSub),
  })

  const childrenMemo = useMemo(() => children, [children])
  const [targetRef, containerRect] = useMeasure({ scroll: true })
  return (
    <ContainerRefContext.Provider value={targetRef}>
      <TitlePanesContext.Provider value={tilePanes}>
        <ContainerRectContext.Provider value={containerRect}>
          <TileBranchesContext.Provider value={branches}>
            <TileLeavesContext.Provider value={leaves}>
              <StretchBarsContext.Provider value={stretchBars}>
                <TileDispatchContext.Provider value={tileStoreDispatch}>
                  <MovingTabsContext.Provider value={movingTabs}>
                    <TabsBarContext.Provider value={TabBar}>
                      {childrenMemo}
                    </TabsBarContext.Provider>
                  </MovingTabsContext.Provider>
                </TileDispatchContext.Provider>
              </StretchBarsContext.Provider>
            </TileLeavesContext.Provider>
          </TileBranchesContext.Provider>
        </ContainerRectContext.Provider>
      </TitlePanesContext.Provider>
    </ContainerRefContext.Provider>
  )
}

export const TileProvider = memo(TileProviderInner)
export * from './typings'
export * from './controller'
export * from './data'
export * from './config'
