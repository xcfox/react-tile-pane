import React, { FC, useState } from 'react'
import {
  ContainerRectContext,
  ContainerRefContext,
} from './ContainerRectContext'
import { UpdateManuallyContext } from './UpdateManuallyContext'
import { TileNode, TitlePaneInterface } from '../..'
import {
  defaultOption,
  DefaultTabsBar,
  OptionContext,
  TabsBarContext,
  TabsBarProps,
  TileNodeListContext,
  Option,
} from '../config'
import useMeasure from 'react-use-measure'
import { useContainer } from '../hook'
import { ContainerContext } from './ContainerContext'
import { DraggableTitlePositionContext } from './DraggableTitlePositionContext'

export interface ProviderOptionProps {
  rootPane: TitlePaneInterface
  children?: React.ReactNode
  tileNodeList: TileNode[]
  tabsBar?: React.FC<TabsBarProps>
  option?: Option
}

export const PaneProvider: FC<ProviderOptionProps> = ({
  rootPane,
  children,
  tileNodeList,
  tabsBar = DefaultTabsBar,
  option = defaultOption,
}: ProviderOptionProps) => {
  const draggableTitlePosition = useState<[number, number]>()
  const { panes, stretchBars, reCalcPane } = useContainer(rootPane)
  const [targetRef, containerRect] = useMeasure({ scroll: true })
  return (
    <ContainerContext.Provider value={{ panes, stretchBars }}>
      <ContainerRefContext.Provider value={targetRef}>
        <DraggableTitlePositionContext.Provider value={draggableTitlePosition}>
          <ContainerRectContext.Provider value={containerRect}>
            <UpdateManuallyContext.Provider value={reCalcPane}>
              <TileNodeListContext.Provider value={tileNodeList}>
                <TabsBarContext.Provider value={tabsBar}>
                  <OptionContext.Provider value={option}>
                    {children}
                  </OptionContext.Provider>
                </TabsBarContext.Provider>
              </TileNodeListContext.Provider>
            </UpdateManuallyContext.Provider>
          </ContainerRectContext.Provider>
        </DraggableTitlePositionContext.Provider>
      </ContainerRefContext.Provider>
    </ContainerContext.Provider>
  )
}

export {
  ContainerRectContext,
  UpdateManuallyContext,
  TileNodeListContext,
  ContainerContext,
  ContainerRefContext,
  DraggableTitlePositionContext,
}
