import React, { createContext } from 'react'
import { DraggableTitle, TileNode, TilePaneEntity } from '../../..'

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
    <div
      style={{ display: 'flex', width: '100%', justifyContent: 'space-around' }}
    >
      {nodeList.map((it, i) => (
        <div
          style={{
            display: 'flex',
          }}
          key={i}
        >
          <DraggableTitle>
            <div
              onClick={() => {
                pane.onTab = i
                calcLayout()
              }}
              style={{
                color: currentNode === it ? '#000' : '#999',
                background: '#d1f0b5',
              }}
            >
              {it.id}
            </div>
          </DraggableTitle>
          <div
            onClick={() => {
              pane.removeTab(it)
              calcLayout()
            }}
          >
            off
          </div>
        </div>
      ))}
    </div>
  )
}
export const TabsBarContext = createContext(DefaultTabsBar)
