import React, { createContext } from 'react'
import { TileNode, TilePaneEntity } from '../../..'

export type TabsBarProps = {
  calcLayout: () => void
  pane: TilePaneEntity
  currentNode: TileNode
  nodeList: TileNode[]
  /** index for current node in node list */
  index: number
}

const DefaultTabsBar: React.FC<TabsBarProps> = ({
  currentNode,
}: TabsBarProps) => {
  return <div>{currentNode.id}</div>
}
export const TabsBarContext = createContext(DefaultTabsBar)
