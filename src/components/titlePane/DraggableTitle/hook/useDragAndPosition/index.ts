import { useState } from 'react'
import { useGesture } from 'react-use-gesture'
import { Vector2 } from 'react-use-gesture/dist/types'
import { PaneWithPreBox, TileLeafID, TilePaneLeaf } from '../../..'

export function useDragAndPosition(
  paneWithPreBoxRef: React.MutableRefObject<PaneWithPreBox | undefined>,
  id: TileLeafID,
  parentPane: TilePaneLeaf | undefined,
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
        console.log(id)
        parentPane && parentPane.startMovingTab(id)
        calcLayout()
      },
      onDragEnd: () => {
        if (!paneWithPreBoxRef.current) return
        const { pane, into } = paneWithPreBoxRef.current
        parentPane && parentPane.endMovingTab(id)
        pane.insertLeaf(id, into)
        calcLayout()
      },
    },
    { drag: { threshold: 10 } }
  )

  return { bind, position }
}
