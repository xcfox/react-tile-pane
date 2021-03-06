import React, {
  createContext,
  memo,
  useCallback,
  useContext,
  useMemo,
} from 'react'
import { TabsBarContext, TileDispatchContext } from '../../../../..'
import { PaneName, TileLeaf } from '../../../../../..'
import { useStyle } from './hook'
export interface TabBarProps {
  leaf: TileLeaf
  onTab: number
  tabs: PaneName[]
}

export type TabBarMoreProps = TabBarProps & {
  isHidden?: boolean
}

export interface TabBarAction {
  switchTab: (onTab: number) => void
  closeTab: (index: number) => void
}

export const LeafContext = createContext<TileLeaf | undefined>(undefined)

const TabsBarInner: React.FC<TabBarMoreProps> = (props) => {
  const { leaf, isHidden } = props
  const tabBar = useContext(TabsBarContext)
  const dispatch = useContext(TileDispatchContext)

  const switchTab = useCallback(
    (onTab: number) =>
      dispatch({
        leafToSwitchTab: {
          leaf,
          onTab,
        },
      }),
    [dispatch, leaf]
  )

  const closeTab = useCallback(
    (index: number) =>
      dispatch({
        leafToCloseTab: {
          leaf,
          name: leaf.children[index],
        },
      }),
    [dispatch, leaf]
  )

  const action: TabBarAction = useMemo(() => ({ switchTab, closeTab }), [
    closeTab,
    switchTab,
  ])

  const { render: Render } = tabBar
  const style = useStyle(leaf.rect, isHidden)
  return useMemo(
    () => (
      <LeafContext.Provider value={leaf}>
        <div style={style}>
          <Render action={action} {...props} />
        </div>
      </LeafContext.Provider>
    ),
    [Render, action, leaf, props, style]
  )
}

export const TabsBar = memo(TabsBarInner)
