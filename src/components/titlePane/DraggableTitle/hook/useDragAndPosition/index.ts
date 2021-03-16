import { useState } from 'react'
import { useGesture } from 'react-use-gesture'
import { Vector2 } from 'react-use-gesture/dist/types'
import { PaneWithPreBox, TilePaneLeaf } from '../../..'

export function useDragAndPosition(
  paneWithPreBoxRef: React.MutableRefObject<PaneWithPreBox | undefined>,
  pane?: TilePaneLeaf
) {
  const [position, setPosition] = useState<Vector2>()

  const bind = useGesture(
    {
      onDrag: ({ down, xy }) => {
        const position = down ? xy : undefined
        setPosition(position)
      },
      onDragStart: () => {
        // TODO: 开始移动标签
        console.log(pane)
      },
      onDragEnd: () => {
        // TODO: 结束移动标签
        console.log(paneWithPreBoxRef.current)
      },
    },
    { drag: { threshold: 10 } }
  )

  return { bind, position }
}
