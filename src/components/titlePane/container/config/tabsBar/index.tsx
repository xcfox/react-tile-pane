import React, { createContext } from 'react'
import { DraggableTitle, TileLeaf, TilePaneEntity } from '../../..'

export type TabsBarProps = {
  calcLayout: () => void
  pane: TilePaneEntity
  currentIndex: number
  leaves: TileLeaf[]
}

export const DefaultTabsBar: React.FC<TabsBarProps> = ({
  calcLayout,
  pane,
  currentIndex,
  leaves,
}: TabsBarProps) => {
  return (
    <div
      style={{ display: 'flex', width: '100%', justifyContent: 'space-around' }}
    >
      {leaves.map((it, i) => (
        <div
          style={{
            display: 'flex',
          }}
          key={it.id}
        >
          <DraggableTitle id={leaves[i].id}>
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
