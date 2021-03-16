import React, { createContext } from 'react'
import { DraggableTitle, TileLeaf, TilePaneEntity } from '../../..'

export type TabsBarProps = {
  calcLayout: () => void
  pane: TilePaneEntity
  currentIndex: number
  nodeList: TileLeaf[]
}

export const DefaultTabsBar: React.FC<TabsBarProps> = ({
  calcLayout,
  pane,
  currentIndex,
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
          <DraggableTitle id={nodeList[currentIndex].id}>
            <div
              onClick={() => {
                pane.onTab = i
                calcLayout()
              }}
              style={{
                color: currentIndex === i ? '#000' : '#999',
                background: '#d1f0b5',
              }}
            >
              {it.id}
            </div>
          </DraggableTitle>
          <div
            onClick={() => {
              pane.removeTab(i)
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
