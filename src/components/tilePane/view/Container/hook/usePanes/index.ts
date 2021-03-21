import { useCallback, useContext, useMemo } from 'react'
import {
  MovingTabsContext,
  TileLeavesContext,
  TitlePanesContext,
} from '../../..'
import { TilePaneWithRect } from '../../../..'
import { TileNodeID } from '../../../../model'

export function usePanes() {
  const movingTabs = useContext(MovingTabsContext)
  const leaves = useContext(TileLeavesContext)
  const tilePanes = useContext(TitlePanesContext)

  const findChildPane = useCallback(
    (id: TileNodeID) => {
      const pane = tilePanes.find((it) => it.id === id)
      return pane?.child
    },
    [tilePanes]
  )

  const panes: TilePaneWithRect[] = useMemo(() => {
    const panes: TilePaneWithRect[] = movingTabs.map((tab) => ({
      id: tab.id,
      child: findChildPane(tab.id),
      rect: null,
    }))
    leaves.forEach((leaf) => {
      panes.push(
        ...leaf.children.map((id, i) => ({
          id,
          child: findChildPane(id),
          rect: leaf.onTab === i ? leaf.rect : null,
        }))
      )
    })
    return panes
  }, [findChildPane, leaves, movingTabs])
  return panes
}
