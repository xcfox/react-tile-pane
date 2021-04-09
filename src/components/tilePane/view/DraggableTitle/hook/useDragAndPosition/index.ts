import { useState, useContext } from 'react'
import { useGesture } from 'react-use-gesture'
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
  const [velocity, setVelocities] = useState(0)

  const bind = useGesture(
    {
      onDrag: ({ down, xy, velocity }) => {
        if (down) {
          setPosition(xy)
          setVelocities(velocity)
        } else {
          setVelocities(0)
          setPosition(undefined)
        }
      },
      onDragStart: () => leaf && dispatch({ tabToStartMoving: { name, leaf } }),
      onDragEnd: () =>
        dispatch({
          tabToStopMoving: { pane: name, preBox: paneWithPreBoxRef.current },
        }),
    },
    { drag: { threshold: 10 } }
  )

  return { bind, position, velocity }
}
