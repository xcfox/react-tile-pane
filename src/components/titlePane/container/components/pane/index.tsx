import React, { useContext, useMemo } from 'react'
import { isNotNil, TileNodeID, TilePaneEntity } from '../../..'
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
  const childNode = useMemo(
    () =>
      pane.children
        .map((id) => tileNodeList.find((node) => node.id === id))
        .filter(isNotNil),
    [pane.children, tileNodeList]
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
          ...toStyles({ top, left, width, height }),
        }}
      >
        <div
          onClick={() => {
            pane.removeSelf()
            calcLayout()
          }}
        >
          标题栏
        </div>
        {childNode.map((it) => it.node)}
      </div>
    ),
    [childNode, height, left, pane, top, calcLayout, width]
  )
}
