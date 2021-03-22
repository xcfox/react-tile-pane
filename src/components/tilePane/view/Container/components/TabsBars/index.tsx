import React, { memo, useMemo } from 'react'
import { TabsBar } from './components'
import { useTabs } from './hook'

const TabsBarsInner: React.FC = () => {
  const tabBars = useTabs()
  return useMemo(
    () => (
      <>
        {tabBars.map((tabBar) => (
          <TabsBar key={tabBar.leaf.id} {...tabBar} />
        ))}
      </>
    ),
    [tabBars]
  )
}

export const TabsBars = memo(TabsBarsInner)
