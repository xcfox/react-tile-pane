import { useState } from 'react'
import { useGesture } from 'react-use-gesture'
import { Vector2 } from 'react-use-gesture/dist/types'
import { PaneWithPreBox } from '../../..'

export function useDragAndPosition(
  paneWithPreBoxRef: React.MutableRefObject<PaneWithPreBox | undefined>
) {
  const [position, setPosition] = useState<Vector2>()

  const bind = useGesture(
    {
      onDrag: ({ down, xy }) => {
        const position = down ? xy : undefined
        setPosition(position)
      },
      onDragEnd: () => {
        console.log(paneWithPreBoxRef.current)
      },
    },
    { drag: { threshold: 10 } }
  )

  return { bind, position }
}
