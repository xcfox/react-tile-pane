import React from 'react'
import { createTileNodeList, TitlePaneInterface } from '../components'
import { PaneContainer } from '../components/titlePane/container'
import './App.css'

const [nodeList, nodeMap] = createTileNodeList({
  arbutus: <div>杨梅</div>,
  cherry: <div>樱桃</div>,
  apple: <div>苹果</div>,
  lemon: <div>柠檬</div>,
  mango: <div>芒果</div>,
  pomelo: <div>柚子</div>,
})

const rootPane: TitlePaneInterface = {
  children: [
    { children: [nodeMap.apple, nodeMap.arbutus] },
    { children: nodeMap.arbutus },
    {
      isRow: true,
      grow: 2,
      children: [
        { children: nodeMap.cherry },
        { children: nodeMap.lemon },
        {
          children: [
            { children: nodeMap.mango, grow: 3 },
            { children: nodeMap.pomelo },
          ],
        },
      ],
    },
  ],
}

const App: React.FC = () => {
  return (
    <div className="App">
      <div style={{ height: 30 }} />
      <div className="fence">
        <PaneContainer tileNodeList={nodeList} rootPane={rootPane} />
      </div>
    </div>
  )
}

export default App
