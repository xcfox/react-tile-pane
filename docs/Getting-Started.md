# Getting started

## Quick Start

```shell
npm i react-use-gesture react-use-measure react-tile-pane
```

or use yarn

```shell
yarn add react-use-gesture react-use-measure react-tile-pane
```

react-tile-pane use [react-use-gesture](https://www.npmjs.com/package/react-use-gesture), [react-use-measure](react-use-measure) as peerDependencies, you need to install them together.

## Example

### Create Tile Panes

First you need to create the Tile Panes List:

```tsx
const [paneList, names] = createTilePanes({
  arbutus: <Arbutus />,
  cherry: <div style={paneStyle}>樱桃</div>,
  apple: <Apple />,
  banana: <div style={paneStyle}>香蕉🍌</div>,
  lemon: <div style={paneStyle}>柠檬</div>,
  mango: <div style={paneStyle}>芒果</div>,
  pomelo: <div style={paneStyle}>柚子</div>,
})
```

As above, `createTilePanes` accepts a dictionary containing `ReactChild`, and return a paneList and a `names` dictionary. The structure of the output dictionary is consistent with the input, each item in the dictionary is essentially a string.

### Describe Layout

```tsx
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
```

As above, we place items in the same level into the same children's array.  
`grow` is same as [flex-grow](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-grow), This property specifies how much of the remaining space in the `TileBranch` should be assigned to the item. Its default value is 1.  
`isRow` is used to declare whether the panes is displayed as a row or a column.  
If the item of `names` dictionary in children's array, it displayed as a Multi-Tag Pane.

### Container

```tsx
const App: React.FC = () => {
  return (
    <TileProvider tilePanes={paneList} rootNode={rootPane}>
      <div className="App">
        <div style={{ height: 30 }} />
        <div style={{ border: '#afafaf solid 2px', width: 1000, height: 600 }}>
          <TileContainer />
        </div>
      </div>
      <DraggableTitle name={names.banana}>拖动这个香蕉🍌</DraggableTitle>
    </TileProvider>
  )
}
```

As above, we input `paneList` and `rootNode` into `TileProvider` as prop `tilePanes` and prop `rootNode`.  
Then, we put `TileContainer` in `TileProvider`. `DraggableTitle` can also be put in `TileProvider`.

### Full Example File

App.tsc

```tsx
import React, { useState } from 'react'
import {
  createTilePanes,
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

const [paneList, names] = createTilePanes({
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
    <TileProvider tilePanes={paneList} rootNode={rootPane}>
      <div className="App">
        <div style={{ height: 30 }} />
        <div style={{ border: '#afafaf solid 2px', width: 1000, height: 600 }}>
          <TileContainer />
        </div>
      </div>
      <DraggableTitle name={names.banana}>拖动这个香蕉🍌</DraggableTitle>
    </TileProvider>
  )
}

export default App
```
