import { useState } from 'react'
import { useGesture } from 'react-use-gesture'
import { Vector2 } from 'react-use-gesture/dist/types'
import { PaneWithPreBox, TileLeafID, TilePaneLeaf } from '../../..'

export function useDragAndPosition(
  paneWithPreBoxRef: React.MutableRefObject<PaneWithPreBox | undefined>,
  id: TileLeafID,
  pane: TilePaneLeaf | undefined,
  calcLayout: () => void
) {
  const [position, setPosition] = useState<Vector2>()

  const bind = useGesture(
    {
      onDrag: ({ down, xy }) => {
        const position = down ? xy : undefined
        setPosition(position)
      },
      onDragStart: () => {
        console.log(pane)
        pane && pane.startMovingTab(id)
        calcLayout()
      },
      onDragEnd: () => {
        // TODO: 结束移动标签
        console.log(paneWithPreBoxRef.current)
        pane && pane.endMovingTab(id)
        calcLayout()
      },
    },
    { drag: { threshold: 10 } }
  )

  return { bind, position }
}
