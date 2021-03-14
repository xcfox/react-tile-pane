import React, { memo, useMemo } from 'react'
import { useDragAndPosition, usePreBox } from './hook'

export interface DraggableTitleProps {}

const DraggableTitleInner: React.FC<DraggableTitleProps> = ({ children }) => {
  const { position, bind } = useDragAndPosition()
  const preBox = usePreBox(position)

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
        {preBox}
        <div {...{ ...bind(), style }} style={style}>
          {children}
        </div>
      </>
    ),
    [bind, children, preBox, style]
  )
}

export const DraggableTitle = memo(DraggableTitleInner)
