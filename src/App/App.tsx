import React, { useState } from 'react'
import {
  createTitlePanes,
  TileBranchSubstance,
  TileContainer,
  TileProvider,
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

function Apple() {
  return <div className="pane">苹果</div>
}

const [nodeList, names] = createTitlePanes({
  arbutus: <Arbutus />,
  cherry: <div className="pane">樱桃</div>,
  apple: <Apple />,
  banana: <div className="pane">香蕉🍌</div>,
  lemon: <div className="pane">柠檬</div>,
  mango: <div className="pane">芒果</div>,
  pomelo: <div className="pane">柚子</div>,
})

const rootPane: TileBranchSubstance = {
  children: [
    { children: [names.apple, names.arbutus] },
    {
      isRow: true,
      grow: 2,
      children: [
        { children: names.cherry },
        { children: names.lemon },
        {
          children: [
            { children: names.mango, grow: 3 },
            { children: names.pomelo },
          ],
        },
      ],
    },
  ],
}

const App: React.FC = () => {
  return (
    <TileProvider tilePanes={nodeList} rootNode={rootPane}>
      <div className="App">
        <div style={{ height: 30 }} />
        <div className="fence">
          <TileContainer />
        </div>
      </div>
    </TileProvider>
  )
}

export default App
