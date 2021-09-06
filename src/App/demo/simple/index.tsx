import React, { useState } from 'react'
import {
  createTilePanes,
  DraggableTitle,
  TileBranchSubstance,
  TileContainer,
  TileProvider,
  useRootPane,
} from '../../../components'
import '../../../static/style.css'

const localStorageKey = 'react-tile-pane-layout'

function Arbutus() {
  const [number, count] = useState(1)
  return (
    <div onClick={() => count((n) => n + 1)} className="pane">
      {number} 颗杨梅
    </div>
  )
}

function Apple() {
  return <div className="pane">apple</div>
}

const [nodeList, names] = createTilePanes({
  arbutus: <Arbutus />,
  cherry: <div className="pane">cherry</div>,
  apple: <Apple />,
  banana: <div className="pane">banana</div>,
  lemon: <div className="pane">lemon</div>,
  mango: <div className="pane">mango</div>,
  pomelo: <div className="pane">pomelo</div>,
})

const rootPane: TileBranchSubstance = {
  children: [
    { children: [names.apple, names.cherry] },
    {
      isRow: true,
      grow: 2,
      children: [
        { children: names.arbutus },
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

function SaveLayout() {
  const rootNode = useRootPane()
  localStorage.setItem(localStorageKey, JSON.stringify(rootNode))
  return <></>
}

export const SimpleDemo: React.FC = () => {
  const localRoot = localStorage.getItem(localStorageKey)
  const root = localRoot
    ? (JSON.parse(localRoot) as TileBranchSubstance)
    : rootPane
  return (
    <TileProvider tilePanes={nodeList} rootNode={root}>
      <SaveLayout />
      <div className="App">
        <div className="fence">
          <TileContainer />
        </div>
      </div>
      <DraggableTitle name={names.arbutus}>Drag this arbutus</DraggableTitle>
      <a href="https://xcfox.github.io/react-tile-pane/">document</a>
    </TileProvider>
  )
}
