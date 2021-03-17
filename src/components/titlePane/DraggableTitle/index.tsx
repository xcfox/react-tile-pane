import React, { memo, useContext, useMemo, useRef } from 'react'
import { ContainerContext, UpdateManuallyContext } from '../container/model'
import { PaneWithPreBox, TileLeafID } from '../util'
import { PreBox } from './components'
import { useDragAndPosition } from './hook'

export interface DraggableTitleProps {
  id: TileLeafID
  children?: React.ReactNode
}

const DraggableTitleInner: React.FC<DraggableTitleProps> = ({
  id,
  children,
}) => {
  const paneWithPreBoxRef = useRef<PaneWithPreBox>()

  const { paneLeaves, panes } = useContext(ContainerContext)
  const calcLayout = useContext(UpdateManuallyContext)
  const pane = useMemo(() => paneLeaves.find((p) => p.children.includes(id)), [
    id,
    paneLeaves,
  ])
  const { position, bind } = useDragAndPosition(
    paneWithPreBoxRef,
    id,
    pane,
    calcLayout
  )

  const style = useMemo(
    () =>
      (position
        ? {
            visibility: 'visible',
            position: 'fixed',
            top: position[1],
            left: position[0],
            transform: 'translate(-50%,-50%)',
            zIndex: 1,
          }
        : {}) as React.CSSProperties,
    [position]
  )
  return useMemo(
    () => (
      <>
        {position && <PreBox {...{ paneWithPreBoxRef, position }} />}
        <div
          onClick={() => {
            console.log('pane: ', pane)
            console.log('panes: ', panes)
          }}
          {...{ ...bind(), style }}
          style={style}
        >
          {children}
        </div>
      </>
    ),
    [bind, children, pane, panes, position, style]
  )
}

export const DraggableTitle = memo(DraggableTitleInner)
