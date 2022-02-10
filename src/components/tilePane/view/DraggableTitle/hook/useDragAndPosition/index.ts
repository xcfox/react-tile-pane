import { useState, useContext } from 'react'
import { useGesture } from '@use-gesture/react'
import { TileDispatchContext } from '../../..'
import { PaneName, TileLeaf } from '../../../..'
import { PaneWithPreBox } from '../../typings'

export function useDragAndPosition(
  paneWithPreBoxRef: React.MutableRefObject<PaneWithPreBox | undefined>,
  name: PaneName,
  leaf: TileLeaf | undefined
) {
  const dispatch = useContext(TileDispatchContext)
  const [position, setPosition] = useState<[number, number]>()
  const isDragging = !!position

  const bind = useGesture(
    {
      onDrag: ({ down, xy, velocity }) => {
        if (down) {
          setPosition(xy)
        } else {
          setPosition(undefined)
        }
      },
      onDragStart: () => dispatch({ tabToStartMoving: { name, leaf } }),
      onDragEnd: () =>
        dispatch({
          tabToStopMoving: { pane: name, preBox: paneWithPreBoxRef.current },
        }),
    },
    { drag: { threshold: 10 } }
  )

  return { bind, position, isDragging }
}
