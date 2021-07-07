# Getting started

## Quick start

```shell
npm i react-use-gesture react-use-measure react-tile-pane
```

or use yarn"

```shell
yarn add react-use-gesture react-use-measure react-tile-pane
```

react-tile-pane use [react-use-gesture](https://www.npmjs.com/package/react-use-gesture), [react-use-measure](react-use-measure) as peerDependencies, you need to install them together.

## Example

App.tsc

```tsx
import React, { useState } from 'react'
import {
  createTitlePanes,
  DraggableTitle,
  TileBranchSubstance,
  TileContainer,
  TileProvider,
} from 'react-tile-pane'
import './App.css'

const paneStyle: React.CSSProperties = {
  width: '100%',
  height: ' 100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}

function Arbutus() {
  const [number, count] = useState(1)
  return (
    <div onClick={() => count((n) => n + 1)} style={paneStyle}>
      {number} 颗杨梅
    </div>
  )
}

function Apple() {
  return <div style={paneStyle}>苹果</div>
}

const [nodeList, names] = createTitlePanes({
  arbutus: <Arbutus />,
  cherry: <div style={paneStyle}>樱桃</div>,
  apple: <Apple />,
  banana: <div style={paneStyle}>香蕉🍌</div>,
  lemon: <div style={paneStyle}>柠檬</div>,
  mango: <div style={paneStyle}>芒果</div>,
  pomelo: <div style={paneStyle}>柚子</div>,
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

const App: React.FC = () => {
  return (
    <TileProvider tilePanes={nodeList} rootNode={rootPane}>
      <div className="App">
        <div style={{ height: 30 }} />
        <div style={{ border: '#afafaf solid 2px', width: 1000, height: 600 }}>
          <TileContainer />
        </div>
      </div>
      <DraggableTitle name={names.banana}>拖动这个香蕉🍌</DraggableTitle>
      <a href="https://xcfox.github.io/react-tile-pane/">查看文档</a>
    </TileProvider>
  )
}

export default App
```
