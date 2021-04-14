import React, { createContext, memo, useMemo } from 'react'
import { TabBarAction, TabBarProps } from '../../..'
import { DraggableTitle, useMovingChecker } from '../../../DraggableTitle'

export type TabBarPropsWithAction = TabBarProps & { action: TabBarAction }

const TabBarInner: React.FC<TabBarPropsWithAction> = ({
  tabs,
  onTab,
  action,
}) => {
  const checkTabMoving = useMovingChecker()

  return useMemo(
    () => (
      <div className="react-tile-pane-tabBar">
        {tabs.map((tab, i) => (
          <DraggableTitle
            className={(isMoving) =>
              isMoving ? 'react-tile-pane-tabMoving' : 'react-tile-pane-tab'
            }
            name={tab}
            key={tab}
          >
            <div
              className={
                i === onTab
                  ? 'react-tile-pane-tabInner '
                  : 'react-tile-pane-tabInnerOff'
              }
              onClick={() => action.switchTab(i)}
            >
              <div className="react-tile-pane-tabTitle">{tab}</div>
              {!checkTabMoving(tabs[i]) && (
                <div
                  className="react-tile-pane-off"
                  onClick={() => action.closeTab(i)}
                >
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
