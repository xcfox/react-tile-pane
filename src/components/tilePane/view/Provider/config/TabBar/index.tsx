import React, { createContext, memo, useMemo } from 'react'
import { TabBarAction, TabBarProps } from '../../..'

export type TabBarPropsWithAction = TabBarProps & { action: TabBarAction }

const TabBarInner: React.FC<TabBarPropsWithAction> = ({
  tabs,
  onTab,
  action,
}) => {
  return useMemo(
    () => (
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          justifyContent: 'space-around',
        }}
      >
        {tabs.map((tab, i) => (
          <div
            onClick={() => action.switchTab(i)}
            style={{ color: onTab === i ? '#222222' : '#999999' }}
            key={tab}
          >
            {tab}
          </div>
        ))}
      </div>
    ),
    [action, onTab, tabs]
  )
}
export type TabsBarPosition = 'left' | 'right' | 'top' | 'bottom'
export type TabsBarConfig = {
  render: React.FC<TabBarPropsWithAction>
  thickness: number | string
  position: TabsBarPosition
}

export const DefaultTabBar = memo(TabBarInner)
export const defaultTabsBarConfig: TabsBarConfig = {
  render: DefaultTabBar,
  thickness: 20,
  position: 'top',
}
export const TabsBarContext = createContext<TabsBarConfig>(defaultTabsBarConfig)
