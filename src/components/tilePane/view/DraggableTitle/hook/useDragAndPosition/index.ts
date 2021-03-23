import { useState, useContext } from 'react'
import { useGesture } from 'react-use-gesture'
import { Vector2 } from 'react-use-gesture/dist/types'
import { TileDispatchContext } from '../../..'
import { PaneName, TileLeaf } from '../../../..'
import { PaneWithPreBox } from '../../typings'

export function useDragAndPosition(
  paneWithPreBoxRef: React.MutableRefObject<PaneWithPreBox | undefined>,
  name: PaneName,
  leaf: TileLeaf | undefined
) {
  const dispatch = useContext(TileDispatchContext)
  const [position, setPosition] = useState<Vector2>()

  const bind = useGesture(
    {
      onDrag: ({ down, xy }) => {
        const position = down ? xy : undefined
        setPosition(position)
      },
      onDragStart: () => {
        leaf && dispatch({ tabToStartMoving: { name, leaf } })
      },
      onDragEnd: () => {
        dispatch({ tabToStopMoving: name })
      },
    },
    { drag: { threshold: 10 } }
  )

  return { bind, position }
}
