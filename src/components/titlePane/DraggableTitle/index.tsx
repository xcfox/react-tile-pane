import React, { memo, useCallback, useContext, useMemo, useState } from 'react'
import { useDrag } from 'react-use-gesture'
import { Vector2 } from 'react-use-gesture/dist/types'
import { DraggableTitlePositionContext } from '../container/model'

export interface DraggableTitleProps {}

const DraggableTitleInner: React.FC<DraggableTitleProps> = ({ children }) => {
  const [position, setSelfPosition] = useState<Vector2>()
  const [, setContextPosition] = useContext(DraggableTitlePositionContext)

  const setPosition = useCallback(
    (xy: Vector2 | undefined) => {
      setSelfPosition(xy)
      setContextPosition(xy)
    },
    [setContextPosition]
  )

  const bind = useDrag(({ down, xy, distance }) => {
    setPosition(down && distance > 10 ? xy : undefined)
  })
  const style: React.CSSProperties = useMemo(
    () =>
      position
        ? {
            position: 'fixed',
            top: position[1],
            left: position[0],
            transform: 'translate(-50%,-50%)',
          }
        : {},
    [position]
  )
  return useMemo(
    () => (
      <div {...bind()} style={style}>
        {children}
      </div>
    ),
    [bind, children, style]
  )
}

export const DraggableTitle = memo(DraggableTitleInner)
