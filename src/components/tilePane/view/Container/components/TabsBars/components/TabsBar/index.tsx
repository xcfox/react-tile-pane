import React, { memo, useContext, useMemo } from 'react'
import { TabBarProps, TabsBarContext } from '../../../../..'
import { useStyle } from './hook'

const TabsBarInner: React.FC<TabBarProps> = (props) => {
  const tabBar = useContext(TabsBarContext)
  const { render: Render } = tabBar
  const style = useStyle(props.leaf.rect)
  return useMemo(
    () => (
      <div style={style}>
        <Render {...props} />
      </div>
    ),
    [Render, props, style]
  )
}

export const TabsBar = memo(TabsBarInner)
