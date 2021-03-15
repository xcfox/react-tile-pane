import React, { useContext, useMemo } from 'react'
import { isNotNil } from '../../..'
import { inLimit, TileNodeID, TilePaneLeaf } from '../../../util'
import { TabsBarContext, OptionContext } from '../../config'
import { TileLeavesContext, UpdateManuallyContext } from '../../model'
import { toStyles } from '../../util'
import { Leaf } from './components'
import { tabsBarPositionToFlexDirection } from './util'

export type LeafRefs = Record<
  TileNodeID,
  React.RefObject<HTMLDivElement> | null
>
export interface PaneProps {
  pane: TilePaneLeaf
  setPaneLeafRefs: React.Dispatch<React.SetStateAction<LeafRefs[]>>
  leafIndex: number
}

export const Pane: React.FC<PaneProps> = ({
  pane,
  setPaneLeafRefs,
  leafIndex,
}) => {
  const tileLeaves = useContext(TileLeavesContext)
  const TabBar = useContext(TabsBarContext)
  const { stretchBarThickness, tabsBarPosition } = useContext(OptionContext)

  const nodeList = useMemo(
    () =>
      pane.children
        .map((id) => tileLeaves.find((node) => node.id === id))
        .filter(isNotNil),
    [pane.children, tileLeaves]
  )
  const currentIndex = useMemo(
    () => inLimit(pane.onTab ?? 0, pane.children.length - 1),
    [pane.children.length, pane.onTab]
  )

  const calcLayout = useContext(UpdateManuallyContext)

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
        {nodeList.map((node, index) => (
          <Leaf
            key={index}
            {...{ leaf: node, currentIndex, index, setPaneLeafRefs, leafIndex }}
          />
        ))}
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
      setPaneLeafRefs,
      leafIndex,
    ]
  )
}
