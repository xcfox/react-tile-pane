import React, { createContext } from 'react'
import { TileNode, TilePaneEntity } from '../../..'

export type TabsBarProps = {
  calcLayout: () => void
  pane: TilePaneEntity
  currentNode: TileNode
  nodeList: TileNode[]
}

export const DefaultTabsBar: React.FC<TabsBarProps> = ({
  calcLayout,
  pane,
  currentNode,
  nodeList,
}: TabsBarProps) => {
  return (
    <div style={{ display: 'flex' }}>
      {nodeList.map((it, i) => (
        <div
          onClick={() => {
            pane.onTab = i
            calcLayout()
          }}
          style={{
            width: '100%',
            color: currentNode === it ? '#000' : '#999',
            background: '#d1f0b5',
          }}
          key={i}
        >
          {it.id}
        </div>
      ))}
    </div>
  )
}
export const TabsBarContext = createContext(DefaultTabsBar)
