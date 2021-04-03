import { useState, useContext } from 'react'
import { useGesture } from 'react-use-gesture'
import { TileDispatchContext } from '../../..'
import { PaneName, TileLeaf } from '../../../..'
import { useMouse } from '..'
import { PaneWithPreBox } from '../../typings'

export function useDragAndPosition(
  paneWithPreBoxRef: React.MutableRefObject<PaneWithPreBox | undefined>,
  name: PaneName,
  leaf: TileLeaf | undefined
) {
  const dispatch = useContext(TileDispatchContext)
  const [isDragging, toggleDragging] = useState(false)
  const mouse = useMouse(isDragging)

  const bind = useGesture(
    {
      onDragStart: () => {
        toggleDragging(true)
        leaf && dispatch({ tabToStartMoving: { name, leaf } })
      },
      onDragEnd: () => {
        toggleDragging(false)
        dispatch({
          tabToStopMoving: { pane: name, preBox: paneWithPreBoxRef.current },
        })
      },
    },
    { drag: { threshold: 10 } }
  )

  return { bind, position: isDragging ? mouse : undefined }
}
