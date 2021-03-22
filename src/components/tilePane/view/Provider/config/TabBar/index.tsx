import React, { createContext, memo, useMemo } from 'react'
import { TileLeaf, PaneName } from '../../../..'

export interface TabBarProps {
  leaf: TileLeaf
  onTab: number
  tabs: PaneName[]
}

const TabBarInner: React.FC<TabBarProps> = ({ tabs, onTab }) => {
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
          <div style={{ color: onTab === i ? '#222222' : '#999999' }} key={tab}>
            {tab}
          </div>
        ))}
      </div>
    ),
    [onTab, tabs]
  )
}
export type TabsBarPosition = 'left' | 'right' | 'top' | 'bottom'
export type TabsBarConfig = {
  render: React.FC<TabBarProps>
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
