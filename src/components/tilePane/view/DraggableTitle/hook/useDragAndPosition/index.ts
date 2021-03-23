import { Dispatch, useState } from 'react'
import { useGesture } from 'react-use-gesture'
import { Vector2 } from 'react-use-gesture/dist/types'
import { TileStoreAction } from '../../..'
import { PaneName, TileLeaf } from '../../../..'
import { PaneWithPreBox } from '../../typings'

export function useDragAndPosition(
  paneWithPreBoxRef: React.MutableRefObject<PaneWithPreBox | undefined>,
  id: PaneName,
  parentPane: TileLeaf | undefined,
  dispatch: Dispatch<TileStoreAction>
) {
  const [position, setPosition] = useState<Vector2>()

  const bind = useGesture(
    {
      onDrag: ({ down, xy }) => {
        const position = down ? xy : undefined
        setPosition(position)
      },
      onDragStart: () => {
        return 0
      },
      onDragEnd: () => {
        return 0
      },
    },
    { drag: { threshold: 10 } }
  )

  return { bind, position }
}
