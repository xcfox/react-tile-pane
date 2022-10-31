import { useState, useContext } from 'react'
import { DragConfig, GestureHandlers, useGesture } from '@use-gesture/react'
import { TileDispatchContext } from '../../..'
import { PaneName, TileLeaf } from '../../../..'
import { PaneWithPreBox } from '../../typings'

export function useDragAndPosition(
  paneWithPreBoxRef: React.MutableRefObject<PaneWithPreBox | undefined>,
  name: PaneName,
  leaf: TileLeaf | undefined,
  hook: Partial<
    Pick<GestureHandlers, 'onDrag' | 'onDragEnd' | 'onDragStart'>
  > = {},
  drag: DragConfig = { threshold: 10, filterTaps: true }
) {
  const dispatch = useContext(TileDispatchContext)
  const [position, setPosition] = useState<[number, number]>()
  const isDragging = !!position

  const bind = useGesture(
    {
      onDrag: (e) => {
        hook?.onDrag?.(e)
        const { down, xy } = e
        if (down) {
          setPosition(xy)
        } else {
          setPosition(undefined)
        }
      },
      onDragStart: (e) => {
        hook?.onDragStart?.(e)
        dispatch({ tabToStartMoving: { name, leaf } })
      },
      onDragEnd: (e) => {
        dispatch({
          tabToStopMoving: { pane: name, preBox: paneWithPreBoxRef.current },
        })
        hook?.onDragEnd?.(e)
      },
    },
    { drag }
  )

  return { bind, position, isDragging }
}
