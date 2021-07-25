import React, { useCallback, useMemo } from 'react'
import {
  DraggableTitle,
  PaneName,
  TabBarPropsWithAction,
  TabsBarConfig,
} from '../../../../components'
import { icons, nodeNames } from '../panes'
import { color, flex, size, styles, thickness } from '../style'

const TabBar: React.FC<TabBarPropsWithAction> = ({ tabs, onTab, action }) => {
  const tabBar = useCallback(
    (tab: PaneName, i: number) => (
      <DraggableTitle
        style={i === onTab ? styles.tabTitleOn : styles.tabTitle}
        name={tab}
        key={tab}
        onClick={() => action.switchTab(i)}
      >
        <div
          style={{
            background: i === onTab ? color.primary : color.secondaryL,
            height: '100%',
            width: 6,
          }}
        />
        <div style={{ ...flex.center, ...size.full }}>
          {icons[tab as nodeNames]}
        </div>
      </DraggableTitle>
    ),
    [action, onTab]
  )

  return useMemo(
    () => (
      <div style={styles.tabBar}>
        <div>{tabs.map(tabBar)}</div>
        <div onClick={() => action.closeTab(onTab)} style={styles.closeButton}>
          ×
        </div>
      </div>
    ),
    [action, onTab, tabBar, tabs]
  )
}

export const tabBarConfig: TabsBarConfig = {
  render: TabBar,
  thickness,
  position: 'left',
  preBox: {
    isRow: false,
    isReverse: false,
  },
}
