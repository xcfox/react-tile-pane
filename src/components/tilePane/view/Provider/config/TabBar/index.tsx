import React, { createContext, memo, useMemo } from 'react'
import { TabBarAction, TabBarProps } from '../../..'
import { DraggableTitle } from '../../../DraggableTitle'
import style from './style.module.css'

export type TabBarPropsWithAction = TabBarProps & { action: TabBarAction }

const TabBarInner: React.FC<TabBarPropsWithAction> = ({
  tabs,
  onTab,
  action,
}) => {
  return useMemo(
    () => (
      <div className={style.tabBar}>
        {tabs.map((tab, i) => (
          <DraggableTitle
            name={tab}
            key={tab}
            className={i === onTab ? style.tabTitle : style.tabTitleOff}
          >
            <div onClick={() => action.switchTab(i)}>{tab}</div>
          </DraggableTitle>
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
  thickness: 24,
  position: 'top',
}
export const TabsBarContext = createContext<TabsBarConfig>(defaultTabsBarConfig)
