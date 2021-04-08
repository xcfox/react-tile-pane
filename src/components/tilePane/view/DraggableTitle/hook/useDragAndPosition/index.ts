import { useContext, useCallback } from 'react'
import {
  MousePositionContext,
  TileDispatchContext,
  useMouseDrag,
} from '../../..'
import { PaneName, TileLeaf } from '../../../..'
import { PaneWithPreBox } from '../../typings'

export function useDragAndPosition(
  paneWithPreBoxRef: React.MutableRefObject<PaneWithPreBox | undefined>,
  name: PaneName,
  leaf: TileLeaf | undefined
) {
  const dispatch = useContext(TileDispatchContext)
  const mouseXY = useContext(MousePositionContext)

  const onStart = useCallback(() => {
    leaf && dispatch({ tabToStartMoving: { name, leaf } })
  }, [dispatch, leaf, name])
  const onEnd = useCallback(() => {
    dispatch({
      tabToStopMoving: { pane: name, preBox: paneWithPreBoxRef.current },
    })
  }, [dispatch, name, paneWithPreBoxRef])

  const { bind, isDragging } = useMouseDrag({ onStart, onEnd })

  return { bind, position: isDragging ? mouseXY : undefined }
}
