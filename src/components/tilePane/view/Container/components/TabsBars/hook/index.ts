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
      const tabBar = tabBarsProps.find((it) => it.leaf === tab.leaf)
      if (tabBar) {
        tabBar.tabs.push(tab.name)
      } else {
        tabBarsProps.push({
          leaf: tab.leaf,
          onTab: tab.leaf.onTab,
          tabs: [tab.name],
          isHidden: true,
        })
      }
    })
    return tabBarsProps
  }, [leaves, movingTabs])
  return tabBarsProps
}
