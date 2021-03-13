import React, { useContext, useMemo } from 'react'
import { TileNodeID } from '../../../../..'
import { TabsBarProps } from '../../../../config'
import { UpdateManuallyContext } from '../../../../model'
import { PaneWithTileNodeChildren } from '../../index'

export function useTabsBar(
  TabBar: React.FC<TabsBarProps>,
  pane: PaneWithTileNodeChildren,
  nodeList: { id: TileNodeID; node: React.ReactChild }[],
  currentTabIndex: number
) {
  const calcLayout = useContext(UpdateManuallyContext)
  return useMemo(
    () => (
      <TabBar
        {...{
          calcLayout,
          pane,
          nodeList,
          currentNode: nodeList[currentTabIndex],
        }}
      />
    ),
    [TabBar, calcLayout, currentTabIndex, nodeList, pane]
  )
}
