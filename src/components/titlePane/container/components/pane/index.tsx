import React, { useContext, useMemo } from 'react'
import { isNotNil, TileNodeID, TilePaneEntity } from '../../..'
import { inLimit } from '../../../util'
import { TabsBarContext } from '../../config'
import { TileNodeListContext, UpdateManuallyContext } from '../../model'
import { toStyles } from '../../util'

export type PaneWithTileNodeChildren = Omit<TilePaneEntity, 'children'> & {
  children: TileNodeID[]
}

export interface PaneProps {
  pane: PaneWithTileNodeChildren
}

export const Pane: React.FC<PaneProps> = ({ pane }) => {
  const tileNodeList = useContext(TileNodeListContext)
  const TabBar = useContext(TabsBarContext)
  const nodeList = useMemo(
    () =>
      pane.children
        .map((id) => tileNodeList.find((node) => node.id === id))
        .filter(isNotNil),
    [pane.children, tileNodeList]
  )
  const { onTab = 0 } = pane
  const currentTabIndex = useMemo(
    () => inLimit(onTab, pane.children.length - 1),
    [onTab, pane.children.length]
  )
  const calcLayout = useContext(UpdateManuallyContext)
  const { top, left, width, height } = pane.position
  return useMemo(
    () => (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          position: 'absolute',
          boxSizing: 'border-box',
          ...toStyles({ top, left, width, height }),
        }}
      >
        <TabBar
          {...{
            calcLayout,
            pane,
            nodeList,
            currentNode: nodeList[currentTabIndex],
          }}
        />
        {nodeList.map((it, i) => (
          <div
            style={{
              flexGrow: currentTabIndex === i ? 1 : 0,
              display: currentTabIndex === i ? 'inline' : 'none',
            }}
            key={i}
          >
            {it.node}
          </div>
        ))}
      </div>
    ),
    [
      top,
      left,
      width,
      height,
      TabBar,
      calcLayout,
      pane,
      nodeList,
      currentTabIndex,
    ]
  )
}
