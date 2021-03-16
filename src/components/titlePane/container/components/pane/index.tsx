import React, { useContext, useMemo } from 'react'
import { isNotNil } from '../../..'
import { inLimit, TileLeafID, TilePaneLeaf } from '../../../util'
import { TabsBarContext, OptionContext } from '../../config'
import { TileLeavesContext, UpdateManuallyContext } from '../../model'
import { toStyles } from '../../util'
import { Leaf } from './components'
import { tabsBarPositionToFlexDirection } from './util'

export type LeafRefs = Record<
  TileLeafID,
  React.RefObject<HTMLDivElement> | null
>
export interface PaneProps {
  pane: TilePaneLeaf
}

export const Pane: React.FC<PaneProps> = ({ pane }) => {
  const tileLeaves = useContext(TileLeavesContext)
  const TabBar = useContext(TabsBarContext)
  const { stretchBarThickness, tabsBarPosition } = useContext(OptionContext)

  const leafList = useMemo(
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

  pane.movingTabs.length && console.log(pane.movingTabs)
  const { movingTabs } = pane

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
        <TabBar {...{ calcLayout, pane, leaves: leafList, currentIndex }} />
        {leafList.map(
          (node, index) =>
            !movingTabs.includes(node.id) && (
              <Leaf key={node.id} {...{ leaf: node, currentIndex, index }} />
            )
        )}
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
      leafList,
      currentIndex,
      movingTabs,
    ]
  )
}
