import { useContext, useMemo } from 'react'
import { MovingTabsContext, TileLeavesContext } from '../../../..'
import { TabBarMoreProps } from '../components'

export function useTabs() {
  const leaves = useContext(TileLeavesContext)
  const movingTabs = useContext(MovingTabsContext)

  const tabBarsProps = useMemo(() => {
    const tabBarsProps: TabBarMoreProps[] = leaves.map((leaf) => ({
      leaf,
      onTab: leaf.onTab,
      tabs: leaf.children.slice(),
    }))
    movingTabs.forEach((tab) => {
      const { leaf } = tab
      if (!leaf) return
      const tabBar = tabBarsProps.find((it) => it.leaf.id === leaf.id)
      if (tabBar) {
        tabBar.tabs.splice(tab.tabIndex, 0, tab.name)
      } else {
        tabBarsProps.splice(tab.leafIndex, 0, {
          leaf: leaf,
          onTab: leaf.onTab,
          tabs: [tab.name],
          isHidden: true,
        })
      }
    })
    return tabBarsProps
  }, [leaves, movingTabs])

  return tabBarsProps
}
