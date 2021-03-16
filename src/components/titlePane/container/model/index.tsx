import React, { FC, useMemo, useState } from 'react'
import {
  ContainerRectContext,
  ContainerRefContext,
} from './ContainerRectContext'
import { UpdateManuallyContext } from './UpdateManuallyContext'
import {
  isTileNodeIDs,
  TileLeaf,
  TileLeafEntity,
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
import { PortalPromise, PortalPromiseContext } from './PortalPromiseContext'

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
  const { panes, stretchBars, reCalcLayout } = useContainer(rootPane)
  const paneLeaves = useMemo(
    () => panes.filter((p) => isTileNodeIDs(p.children)) as TilePaneLeaf[],
    [panes]
  )
  const tileLeafEntities = useMemo(
    () => tileLeaves.map((leaf) => new TileLeafEntity(leaf)),
    [tileLeaves]
  )
  const promiseState = useState<PortalPromise>()
  const [targetRef, containerRect] = useMeasure({ scroll: true })
  return (
    <ContainerContext.Provider value={{ panes, stretchBars, paneLeaves }}>
      <ContainerRefContext.Provider value={targetRef}>
        <ContainerRectContext.Provider value={containerRect}>
          <UpdateManuallyContext.Provider value={reCalcLayout}>
            <TileLeavesContext.Provider value={tileLeafEntities}>
              <TabsBarContext.Provider value={tabsBar}>
                <OptionContext.Provider value={option}>
                  <PortalPromiseContext.Provider value={promiseState}>
                    {children}
                  </PortalPromiseContext.Provider>
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
  PortalPromiseContext,
}
