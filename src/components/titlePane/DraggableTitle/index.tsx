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

  const { paneLeaves } = useContext(ContainerContext)
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

  const style: React.CSSProperties = useMemo(
    () =>
      position
        ? {
            position: 'fixed',
            top: position[1],
            left: position[0],
            transform: 'translate(-50%,-50%)',
            zIndex: 1,
          }
        : {},
    [position]
  )
  return useMemo(
    () => (
      <>
        {position && <PreBox {...{ paneWithPreBoxRef, position }} />}
        <div {...{ ...bind(), style }} style={style}>
          {children}
        </div>
      </>
    ),
    [bind, children, position, style]
  )
}

export const DraggableTitle = memo(DraggableTitleInner)
