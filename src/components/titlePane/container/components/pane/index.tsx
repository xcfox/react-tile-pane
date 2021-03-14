import React, { useContext, useMemo } from 'react'
import { isNotNil, TileNodeID, TilePaneEntity } from '../../..'
import { inLimit } from '../../../util'
import { TabsBarContext, OptionContext } from '../../config'
import { TileNodeListContext, UpdateManuallyContext } from '../../model'
import { toStyles } from '../../util'
import { useNodeList } from './hook'
import { tabsBarPositionToFlexDirection } from './util'

export type PaneWithTileNodeChildren = Omit<TilePaneEntity, 'children'> & {
  children: TileNodeID[]
}

export interface PaneProps {
  pane: PaneWithTileNodeChildren
}

export const Pane: React.FC<PaneProps> = ({ pane }) => {
  const tileNodeList = useContext(TileNodeListContext)
  const TabBar = useContext(TabsBarContext)
  const { stretchBarThickness, tabsBarPosition } = useContext(OptionContext)

  const nodeList = useMemo(
    () =>
      pane.children
        .map((id) => tileNodeList.find((node) => node.id === id))
        .filter(isNotNil),
    [pane.children, tileNodeList]
  )
  const currentIndex = useMemo(
    () => inLimit(pane.onTab ?? 0, pane.children.length - 1),
    [pane.children.length, pane.onTab]
  )

  const calcLayout = useContext(UpdateManuallyContext)
  const nodeListMemo = useNodeList(nodeList, currentIndex)

  const { top, left, width, height } = pane.position

  return useMemo(
    () => (
      <div
        style={{
          display: 'flex',
          flexDirection: tabsBarPositionToFlexDirection(tabsBarPosition),
          position: 'absolute',
          boxSizing: 'border-box',
          padding: stretchBarThickness / 2,
          ...toStyles({ top, left, width, height }),
        }}
      >
        <TabBar {...{ calcLayout, pane, nodeList, currentIndex }} />
        {nodeListMemo}
      </div>
    ),
    [
      tabsBarPosition,
      stretchBarThickness,
      top,
      left,
      width,
      height,
      TabBar,
      calcLayout,
      pane,
      nodeList,
      currentIndex,
      nodeListMemo,
    ]
  )
}
