import { useContext, useMemo } from 'react'
import { MovingTabsContext, TileLeavesContext } from '../../../../..'
import { TilePaneWithRect } from '../../../../../..'

export function usePanes() {
  const movingTabs = useContext(MovingTabsContext)
  const leaves = useContext(TileLeavesContext)

  const panes: TilePaneWithRect[] = useMemo(() => {
    const panes: TilePaneWithRect[] = movingTabs.map((tab) => ({
      id: tab.id,
      rect: null,
    }))
    leaves.forEach((leaf) => {
      panes.push(
        ...leaf.children.map((id, i) => ({
          id,
          rect: leaf.onTab === i ? leaf.rect : null,
        }))
      )
    })
    return panes
  }, [leaves, movingTabs])
  return panes
}
