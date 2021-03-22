import { useContext, useMemo } from 'react'
import { MovingTabsContext, TileLeavesContext } from '../../../..'
import { TabBarProps } from '../components'

export function useTabs() {
  const leaves = useContext(TileLeavesContext)
  const movingTabs = useContext(MovingTabsContext)

  const tabBarsProps = useMemo(() => {
    const tabBarsProps: TabBarProps[] = leaves.map((leaf) => ({
      leaf,
      onTab: leaf.onTab,
      tabs: leaf.children,
    }))
    movingTabs.forEach((tab) => {
      const tabBar = tabBarsProps.find((it) => it.leaf === tab.leaf)
      if (tabBar) {
        tabBar.tabs.push(tab.name)
      }
    })
    return tabBarsProps
  }, [leaves, movingTabs])
  return tabBarsProps
}
