import React, { memo, useMemo, useRef } from 'react'
import { PaneWithPreBox } from '../util'
import { PreBox } from './components'
import { useDragAndPosition } from './hook'

export interface DraggableTitleProps {}

const DraggableTitleInner: React.FC<DraggableTitleProps> = ({ children }) => {
  const paneWithPreBoxRef = useRef<PaneWithPreBox>()
  const { position, bind } = useDragAndPosition(paneWithPreBoxRef)

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
        {position && (
          <PreBox paneWithPreBoxRef={paneWithPreBoxRef} position={position} />
        )}
        <div {...{ ...bind(), style }} style={style}>
          {children}
        </div>
      </>
    ),
    [bind, children, position, style]
  )
}

export const DraggableTitle = memo(DraggableTitleInner)
