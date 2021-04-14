import React, { createContext, memo, useMemo } from 'react'
import { TabBarAction, TabBarProps } from '../../..'
import { DraggableTitle, useMovingChecker } from '../../../DraggableTitle'
import style from '../style.module.css'

export type TabBarPropsWithAction = TabBarProps & { action: TabBarAction }

const TabBarInner: React.FC<TabBarPropsWithAction> = ({
  tabs,
  onTab,
  action,
}) => {
  const checkTabMoving = useMovingChecker()

  return useMemo(
    () => (
      <div className={style.tabBar}>
        {tabs.map((tab, i) => (
          <DraggableTitle
            className={(isMoving) => (isMoving ? style.tabMoving : style.tab)}
            name={tab}
            key={tab}
          >
            <div
              className={i === onTab ? style.tabInner : style.tabInnerOff}
              onClick={() => action.switchTab(i)}
            >
              <div className={style.tabTitle}>{tab}</div>
              {!checkTabMoving(tabs[i]) && (
                <div className={style.off} onClick={() => action.closeTab(i)}>
                  ×
                </div>
              )}
            </div>
          </DraggableTitle>
        ))}
      </div>
    ),
    [action, checkTabMoving, onTab, tabs]
  )
}
export type TabsBarPosition = 'left' | 'right' | 'top' | 'bottom'
export type TabsBarConfig = {
  render: React.FC<TabBarPropsWithAction>
  thickness: number | string
  position: TabsBarPosition
  preBox?: {
    isRow?: boolean
    isReverse?: boolean
  }
}

export const DefaultTabBar = memo(TabBarInner)
export const defaultTabsBarConfig: TabsBarConfig = {
  render: DefaultTabBar,
  thickness: 24,
  position: 'top',
  preBox: {
    isRow: true,
    isReverse: false,
  },
}
export const TabsBarContext = createContext<TabsBarConfig>(defaultTabsBarConfig)
