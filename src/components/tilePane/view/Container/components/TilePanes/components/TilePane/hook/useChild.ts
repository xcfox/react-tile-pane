import { useContext, useCallback, useMemo } from 'react'
import { TitlePanesContext } from '../../../../../..'
import { PaneName } from '../../../../../../..'

export function useChild(id: PaneName) {
  const tilePanes = useContext(TitlePanesContext)

  const findChildPane = useCallback(
    (id: PaneName) => {
      const pane = tilePanes.find((it) => it.name === id)
      return pane?.child
    },
    [tilePanes]
  )
  const child = useMemo(() => findChildPane(id), [findChildPane, id])
  return child
}
