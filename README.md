# React Tile Pane

A React tiling pane manager

## preview

An online demo is available at https://xcfox.github.io/react-tile-pane/demo/

## install

```shell
npm install @use-gesture/react react-use-measure react-tile-pane
```

or use yarn

```shell
yarn add @use-gesture/react react-use-measure react-tile-pane
```

react-tile-pane use [@use-gesture/react](https://www.npmjs.com/package/@use-gesture/react), [react-use-measure](https://www.npmjs.com/package/react-use-measure) as peerDependencies, you need to install them at the same time.

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

As above, `createTilePanes` accepts a dictionary containing `ReactNode`, and return a `paneList` and a `names` dictionary. The structure of the output dictionary is consistent with the input, each item in the dictionary is essentially a string.

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

> Note: Each name can only appear in the layout at most once.

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

## Custom Styles

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

## Hooks and Components

Hooks and components help you do more complex operations.

> Note: Hooks and Components only work inside the `TileContainer`

Examples can be viewed at https://github.com/xcfox/react-tile-pane/blob/main/src/App/demo/left-tab/index.tsx

### DraggableTitle

`DraggableTitle` used to open a new pane from outside the container.
It accepts `style`, `className`, `children` attributes.

- `name`: Associate a pane from the paneList by the name

- `dragConfig`: Drag behavior, see more information in [use-gesture doc](https://use-gesture.netlify.app/docs/options/)
- `onDrag`: Actions triggered when dragging, see more information in [use-gesture doc](https://use-gesture.netlify.app/docs/gestures/#about-the-drag-gesture)
- `onDragEnd`: Actions triggered when drag ends
- `onDragStart`: Actions triggered when drag starts

#### Example

```tsx
function PaneIcon({ name }: { name: keyof typeof icons }) {
  const getLeaf = useGetLeaf()
  const move = useMovePane()
  const leaf = getLeaf(name)
  const isShowing = !!leaf
  return (
    <div>
      <div style={{ width: 40, height: 40, cursor: 'move' }}>
        <DraggableTitle name={name}>{icons[name]}</DraggableTitle>
      </div>
      <div onClick={() => move(name, isShowing ? null : [0.99, 0.5])} />
    </div>
  )
}
```

### useGetLeaf

Get a function to get pane by name.

```tsx
// Used in a React Function Components
const getLeaf = useGetLeaf()
// get a leaf by its name, when the pane is not displayed, it will return undefined
const leaf = getLeaf(names.apple)
```

### useMove

Get a function to move the pane.

```tsx
// Used in a React Function Components
const move = useMovePane()
return (
  <div>
    <div
      // When an array of length 2 is passed in, the pane will be moved to that position in the container.
      // When null is passed in, the pane will be closed.
      onClick={() => move(name, isShowing ? null : [0.99, 0.5])}
      style={{
        cursor: 'pointer',
        background: isShowing ? color.primary : color.secondary,
        width: 14,
        height: 14,
        borderRadius: 99,
      }}
    />
  </div>
)
```

### useGetRootNode

Get a function to get `RootNode`, used to persist the current layout.

```tsx
const localStorageKey = 'react-tile-pane-left-tab-layout'

function AutoSaveLayout() {
  const getRootNode = useGetRootNode()
  localStorage.setItem(localStorageKey, JSON.stringify(getRootNode()))
  return <></>
}

export const LeftTabDemo: React.FC = () => {
  const localRoot = localStorage.getItem(localStorageKey)
  const root = localRoot
    ? (JSON.parse(localRoot) as TileBranchSubstance)
    : rootPane
  return (
    <TileProvider tilePanes={nodeList} rootNode={root} tabBar={tabBarConfig}>
      <TileContainer style={styles.container} />
      <AutoSaveLayout />
    </TileProvider>
  )
}
```

### useReset

Get a function to reset layout.

```tsx
const reset = useReset()
const handleClick = useCallback(() => reset(rootPane), [])
```

## Some similar projects

- [react-mosaic](https://github.com/nomcopter/react-mosaic)
- [FlexLayout](https://github.com/caplin/FlexLayout)
