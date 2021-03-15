import React, { useState } from 'react'
import {
  createTileLeaves,
  TitlePaneInterface,
  PaneContainerWithProvider,
} from '../components'
import './App.css'

function Arbutus() {
  const [number, count] = useState(1)
  return (
    <div onClick={() => count((n) => n + 1)} className="pane">
      {number} 颗杨梅
    </div>
  )
}

const [nodeList, nodeDictionary] = createTileLeaves({
  arbutus: <Arbutus />,
  cherry: <div className="pane">樱桃</div>,
  apple: <div className="pane">苹果</div>,
  lemon: <div className="pane">柠檬</div>,
  mango: <div className="pane">芒果</div>,
  pomelo: <div className="pane">柚子</div>,
})

const rootPane: TitlePaneInterface = {
  children: [
    { children: [nodeDictionary.apple, nodeDictionary.arbutus] },
    {
      isRow: true,
      grow: 2,
      children: [
        { children: nodeDictionary.cherry },
        { children: nodeDictionary.lemon },
        { children: nodeDictionary.arbutus },
        {
          children: [
            { children: nodeDictionary.mango, grow: 3 },
            { children: nodeDictionary.pomelo },
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
        <PaneContainerWithProvider TileLeaves={nodeList} rootPane={rootPane} />
      </div>
    </div>
  )
}

export default App
