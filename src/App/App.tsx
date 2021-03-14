import React, { useState } from 'react'
import { createTileNodeList, TitlePaneInterface } from '../components'
import { PaneContainerWithProvide } from '../components/titlePane/container'
import './App.css'

function Arbutus() {
  const [number, count] = useState(1)
  return (
    <div onClick={() => count((n) => n + 1)} className="pane">
      {number} 颗杨梅
    </div>
  )
}

const [nodeList, nodeMap] = createTileNodeList({
  arbutus: <Arbutus />,
  cherry: <div className="pane">樱桃</div>,
  apple: <div className="pane">苹果</div>,
  lemon: <div className="pane">柠檬</div>,
  mango: <div className="pane">芒果</div>,
  pomelo: <div className="pane">柚子</div>,
})

const rootPane: TitlePaneInterface = {
  children: [
    { children: [nodeMap.apple, nodeMap.arbutus] },
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
        <PaneContainerWithProvide tileNodeList={nodeList} rootPane={rootPane} />
      </div>
    </div>
  )
}

export default App
