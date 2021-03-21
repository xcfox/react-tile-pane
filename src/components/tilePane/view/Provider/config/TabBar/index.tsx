import React, { createContext, memo, useMemo } from 'react'
import { TileLeaf, TileNodeID } from '../../../..'

export interface TabBarProps {
  leaf: TileLeaf
  onTab: number
  tabs: TileNodeID[]
}

const TabBarInner: React.FC<TabBarProps> = () => {
  return useMemo(() => <div>this is your TabBar</div>, [])
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
  thickness: 80,
  position: 'top',
}
export const TabsBarContext = createContext<TabsBarConfig>(defaultTabsBarConfig)
