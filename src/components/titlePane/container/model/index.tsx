import React, { FC } from 'react'

import { RectReadOnly } from 'react-use-measure'
import { ContainerRectContext } from './ContainerRectContext'
import { UpdateManuallyContext } from './UpdateManuallyContext'
import { TileNode } from '../..'
import {
  DefaultTabsBar,
  TabsBarContext,
  TabsBarProps,
  TileNodeListContext,
} from '../config'

export interface ProviderProps {
  children?: React.ReactNode
  containerRect: RectReadOnly
  reCalcPane: () => void
  tileNodeList: TileNode[]
  tabsBar?: React.FC<TabsBarProps>
}

export const Provider: FC<ProviderProps> = ({
  children,
  containerRect,
  reCalcPane,
  tileNodeList,
  tabsBar = DefaultTabsBar,
}: ProviderProps) => (
  <ContainerRectContext.Provider value={containerRect}>
    <UpdateManuallyContext.Provider value={reCalcPane}>
      <TileNodeListContext.Provider value={tileNodeList}>
        <TabsBarContext.Provider value={tabsBar}>
          {children}
        </TabsBarContext.Provider>
      </TileNodeListContext.Provider>
    </UpdateManuallyContext.Provider>
  </ContainerRectContext.Provider>
)

export { ContainerRectContext, UpdateManuallyContext, TileNodeListContext }
