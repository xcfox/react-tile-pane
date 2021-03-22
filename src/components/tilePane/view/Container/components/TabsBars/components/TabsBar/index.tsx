import React, { memo, useCallback, useContext, useMemo } from 'react'
import { TabsBarContext, TileDispatchContext } from '../../../../..'
import { PaneName, TileLeaf } from '../../../../../..'
import { useStyle } from './hook'
export interface TabBarProps {
  leaf: TileLeaf
  onTab: number
  tabs: PaneName[]
}

export interface TabBarAction {
  switchTab: (onTab: number) => void
}

const TabsBarInner: React.FC<TabBarProps> = (props) => {
  const tabBar = useContext(TabsBarContext)
  const dispatch = useContext(TileDispatchContext)

  const switchTab = useCallback(
    (onTab: number) => {
      dispatch({
        leafToSwitchTab: {
          leaf: props.leaf,
          onTab,
        },
      })
    },
    [dispatch, props.leaf]
  )

  const action: TabBarAction = useMemo(() => ({ switchTab }), [switchTab])

  const { render: Render } = tabBar
  const style = useStyle(props.leaf.rect)
  return useMemo(
    () => (
      <div style={style}>
        <Render action={action} {...props} />
      </div>
    ),
    [Render, action, props, style]
  )
}

export const TabsBar = memo(TabsBarInner)
