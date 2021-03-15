import React, { FC } from 'react'
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
  TileLeavesContext,
  Option,
} from '../config'
import useMeasure from 'react-use-measure'
import { useContainer } from '../hook'
import { ContainerContext } from './ContainerContext'

export interface ProviderOptionProps {
  rootPane: TitlePaneInterface
  children?: React.ReactNode
  TileLeaves: TileNode[]
  tabsBar?: React.FC<TabsBarProps>
  option?: Option
}

export const PaneProvider: FC<ProviderOptionProps> = ({
  rootPane,
  children,
  TileLeaves,
  tabsBar = DefaultTabsBar,
  option = defaultOption,
}: ProviderOptionProps) => {
  const { panes, stretchBars, reCalcLayout } = useContainer(rootPane)
  const [targetRef, containerRect] = useMeasure({ scroll: true })
  return (
    <ContainerContext.Provider value={{ panes, stretchBars }}>
      <ContainerRefContext.Provider value={targetRef}>
        <ContainerRectContext.Provider value={containerRect}>
          <UpdateManuallyContext.Provider value={reCalcLayout}>
            <TileLeavesContext.Provider value={TileLeaves}>
              <TabsBarContext.Provider value={tabsBar}>
                <OptionContext.Provider value={option}>
                  {children}
                </OptionContext.Provider>
              </TabsBarContext.Provider>
            </TileLeavesContext.Provider>
          </UpdateManuallyContext.Provider>
        </ContainerRectContext.Provider>
      </ContainerRefContext.Provider>
    </ContainerContext.Provider>
  )
}

export {
  ContainerRectContext,
  UpdateManuallyContext,
  TileLeavesContext,
  ContainerContext,
  ContainerRefContext,
}
