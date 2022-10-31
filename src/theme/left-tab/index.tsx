import React from 'react'
import {
  DraggableTitle,
  PaneName,
  StretchBarConfig,
  TabsBarConfig,
} from 'components'
import { color, flex, size, styles, thickness } from './styles'

export * from './styles'

export const tabBarConfig: (
  icons: Record<string | number, string>,
  defaultIcon: string
) => TabsBarConfig = (icons, defaultIcon) => ({
  render({ tabs, onTab, action }) {
    return (
      <div style={styles.tabBar}>
        <div>{tabs.map(tabBar)}</div>
        <div onClick={() => action.closeTab(onTab)} style={styles.closeButton}>
          ×
        </div>
      </div>
    )
    function tabBar(tab: PaneName, i: number) {
      return (
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
            {icons[tab] ?? defaultIcon}
          </div>
        </DraggableTitle>
      )
    }
  },
  thickness,
  position: 'left',
  preBox: {
    isRow: false,
    isReverse: false,
  },
})

export const stretchBar: StretchBarConfig = {
  className: 'left-stretch-bar',
  style: (isRow) => ({ cursor: isRow ? 'ew-resize' : 'ns-resize' }),
  position: 'previous',
}

export const theme = (
  icons: Record<string | number, string>,
  defaultIcon = '⭐'
) => ({
  tabBar: tabBarConfig(icons, defaultIcon),
  stretchBar,
})
