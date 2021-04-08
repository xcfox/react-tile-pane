import { useCallback, useEffect, useState, useContext } from 'react'
import { MousePositionContext } from '../..'
export type Vector2 = [number, number]

export function useMouseXY(enable = true) {
  const [position, setPosition] = useState<Vector2>([0, 0])

  const mousemove = useCallback(
    (e: MouseEvent) => {
      enable && setPosition([e.clientX, e.clientY])
    },
    [enable]
  )

  useEffect(() => {
    window.addEventListener('mousemove', mousemove)
    return () => {
      window.removeEventListener('mousemove', mousemove)
    }
  }, [mousemove])

  return position
}

export interface UseMouseDragOption {
  onStart?: () => void
  onEnd?: () => void
  threshold?: number
}

export function useMouseDrag({
  threshold = 6,
  onEnd,
  onStart,
}: UseMouseDragOption) {
  const mouseXY = useContext(MousePositionContext)
  const [mouseDownXY, setMouseDownXY] = useState<Vector2>()
  const [isDragging, toggleDragging] = useState(false)

  const onMouseDown = useCallback<
    React.MouseEventHandler<HTMLDivElement>
  >(() => {
    setMouseDownXY(mouseXY)
  }, [mouseXY])

  const onMouseMove = useCallback<
    React.MouseEventHandler<HTMLDivElement>
  >(() => {
    if (
      !isDragging &&
      mouseDownXY &&
      biggerThanThreshold(mouseXY, mouseDownXY, threshold)
    ) {
      toggleDragging(true)
      onStart && onStart()
    }
  }, [isDragging, mouseDownXY, mouseXY, onStart, threshold])

  const onMouseUp = useCallback<React.MouseEventHandler<HTMLDivElement>>(() => {
    setMouseDownXY(undefined)
    toggleDragging(false)
    onEnd && onEnd()
  }, [onEnd])

  const bind = { onMouseDown, onMouseMove, onMouseUp }
  return { bind, isDragging }
}

function biggerThanThreshold(
  [x1, y1]: Vector2,
  [x2, y2]: Vector2,
  threshold: number
) {
  return Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2) > Math.pow(threshold, 2)
}
