import React, { useContext, useMemo } from 'react'
import { TilePaneEntity } from '../../..'
import { UpdateManuallyContext } from '../../model'
import { toStyles } from '../../util'

export interface PaneProps {
  pane: TilePaneEntity
}

export const Pane: React.FC<PaneProps> = ({ pane }) => {
  const childNode = useMemo(() => pane.children, [pane.children])
  const update = useContext(UpdateManuallyContext)
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
            update()
          }}
        >
          标题栏
        </div>
        {childNode}
      </div>
    ),
    [childNode, height, left, pane, top, update, width]
  )
}
