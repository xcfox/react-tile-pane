import { useState } from 'react'
import { useDrag } from 'react-use-gesture'
import { Vector2 } from 'react-use-gesture/dist/types'

export function useDragAndPosition() {
  const [position, setSelfPosition] = useState<Vector2>()

  const bind = useDrag(({ down, xy, distance }) => {
    const position = down && distance > 10 ? xy : undefined
    setSelfPosition(position)
  })

  return { bind, position }
}
