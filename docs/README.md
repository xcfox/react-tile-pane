# React Tile Pane

A React tiling pane manager

## preview

An online demo is available at https://xcfox.github.io/react-tile-pane/demo/

## install

```shell
npm install react-use-gesture react-use-measure react-tile-pane
```

or use yarn

```shell
yarn add react-use-gesture react-use-measure react-tile-pane
```

react-tile-pane use [react-use-gesture](https://www.npmjs.com/package/react-use-gesture), [react-use-measure](react-use-measure) as peerDependencies, you need to install them at the same time.

## Quick Start

### Create Tile Panes

First you need to create the Tile Panes List:

```tsx
const [paneList, names] = createTilePanes({
  arbutus: <Arbutus />,
  cherry: <div style={paneStyle}>cherry</div>,
  apple: <Apple />,
  banana: <div style={paneStyle}>banana🍌</div>,
  lemon: <div style={paneStyle}>lemon</div>,
  mango: <div style={paneStyle}>mango</div>,
  pomelo: <div style={paneStyle}>pomelo</div>,
})
```

As above, `createTilePanes` accepts a dictionary containing `ReactChild`, and return a `paneList` and a `names` dictionary. The structure of the output dictionary is consistent with the input, each item in the dictionary is essentially a string.

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

## Container

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
      <DraggableTitle name={names.banana}>Drag this banana🍌</DraggableTitle>
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
      {number} catties of arbutus
    </div>
  )
}

function Apple() {
  return <div style={paneStyle}>apple</div>
}

const [paneList, names] = createTilePanes({
  arbutus: <Arbutus />,
  cherry: <div style={paneStyle}>cherry</div>,
  apple: <Apple />,
  banana: <div style={paneStyle}>banana</div>,
  lemon: <div style={paneStyle}>lemon</div>,
  mango: <div style={paneStyle}>mango</div>,
  pomelo: <div style={paneStyle}>pomelo</div>,
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
      <DraggableTitle name={names.banana}>Drag this banana🍌</DraggableTitle>
    </TileProvider>
  )
}

export default App
```

## Custom-Styles

`React Tile Pane` does not focus on styles.
It is recommended to use custom styles.

A complete example is available at https://github.com/xcfox/react-tile-pane/tree/main/src/App/demo/left-tab  
To customize the style, the `TileProvider` accepts the following properties:

### pane

`pane` is the basic unit of layout.  
It accepts `style` and `className` attributes.

### preBox

When you drag the title, a box will appear inside the container to help you determine the position of the pane after releasing the mouse, this box is called `preBox`.  
It accepts `style`, `className`, `child` attributes.

### stretchBar

The stretchBar is in between the pane and is used to resize the pane.  
It accepts `style`, `className`, `child` attributes.

### tabBar

TabBar for managing overlapping panes.  
It accepts `render`, `thickness`, `position` attributes.

- `render`: To customize how the TabsBar is rendered
- `thickness`: Accepts a CSS length attribute, which defaults to px if number is passed in
- `position`: Where to position the TabsBar in the pane

## Hooks

hooks help you do more complex operations.

> Note: hooks only work inside the TileContainer

## Some Similar projects

- [react-mosaic](https://github.com/nomcopter/react-mosaic)
- [FlexLayout](https://github.com/caplin/FlexLayout)
