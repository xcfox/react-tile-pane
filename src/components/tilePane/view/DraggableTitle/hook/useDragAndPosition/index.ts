import { useState, useContext } from 'react'
import { useGesture, addV } from 'react-use-gesture'
import { TileDispatchContext } from '../../..'
import { PaneName, TileLeaf } from '../../../..'
// import { useMouse } from '..'
import { PaneWithPreBox } from '../../typings'

export function useDragAndPosition(
  paneWithPreBoxRef: React.MutableRefObject<PaneWithPreBox | undefined>,
  name: PaneName,
  leaf: TileLeaf | undefined
) {
  const dispatch = useContext(TileDispatchContext)
  const [position, setPosition] = useState<[number, number]>()

  const bind = useGesture(
    {
      onDrag: ({ down, xy, delta }) => {
        if (down) setPosition(addV(xy, delta))
        else setPosition(undefined)
      },
      onDragStart: () => leaf && dispatch({ tabToStartMoving: { name, leaf } }),
      onDragEnd: () =>
        dispatch({
          tabToStopMoving: { pane: name, preBox: paneWithPreBoxRef.current },
        }),
    },
    { drag: { threshold: 10 } }
  )

  return { bind, position }
}
