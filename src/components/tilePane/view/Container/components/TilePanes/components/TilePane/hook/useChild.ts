import { useContext, useCallback, useMemo } from 'react'
import { TitlePanesContext } from '../../../../../..'
import { TileNodeID } from '../../../../../../..'

export function useChild(id: TileNodeID) {
  const tilePanes = useContext(TitlePanesContext)

  const findChildPane = useCallback(
    (id: TileNodeID) => {
      const pane = tilePanes.find((it) => it.id === id)
      return pane?.child
    },
    [tilePanes]
  )
  const child = useMemo(() => findChildPane(id), [findChildPane, id])
  return child
}
