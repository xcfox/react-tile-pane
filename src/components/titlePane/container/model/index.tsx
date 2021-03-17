import React, { FC, useMemo } from 'react'
import {
  ContainerRectContext,
  ContainerRefContext,
} from './ContainerRectContext'
import { UpdateManuallyContext } from './UpdateManuallyContext'
import {
  isTileNodeIDs,
  TileLeaf,
  TilePaneLeaf,
  TitlePaneInterface,
} from '../..'
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
import { FindLeafContext } from './FindLeafContext'

export interface ProviderOptionProps {
  rootPane: TitlePaneInterface
  children?: React.ReactNode
  tileLeaves: TileLeaf[]
  tabsBar?: React.FC<TabsBarProps>
  option?: Option
}

export const PaneProvider: FC<ProviderOptionProps> = ({
  rootPane,
  children,
  tileLeaves,
  tabsBar = DefaultTabsBar,
  option = defaultOption,
}: ProviderOptionProps) => {
  const { panes, stretchBars, reCalcLayout, findLeaf } = useContainer(rootPane)
  const paneLeaves = useMemo(
    () => panes.filter((p) => isTileNodeIDs(p.children)) as TilePaneLeaf[],
    [panes]
  )
  const [targetRef, containerRect] = useMeasure({ scroll: true })
  return (
    <ContainerContext.Provider value={{ panes, stretchBars, paneLeaves }}>
      <ContainerRefContext.Provider value={targetRef}>
        <ContainerRectContext.Provider value={containerRect}>
          <UpdateManuallyContext.Provider value={reCalcLayout}>
            <FindLeafContext.Provider value={findLeaf}>
              <TileLeavesContext.Provider value={tileLeaves}>
                <TabsBarContext.Provider value={tabsBar}>
                  <OptionContext.Provider value={option}>
                    {children}
                  </OptionContext.Provider>
                </TabsBarContext.Provider>
              </TileLeavesContext.Provider>
            </FindLeafContext.Provider>
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
  FindLeafContext,
}
