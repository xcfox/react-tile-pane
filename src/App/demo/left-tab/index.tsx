import React from 'react'
import {
  DraggableTitle,
  TileContainer,
  TileProvider,
  useGetLeaf,
  useMovePane,
  useGetRootNode,
  TileBranchSubstance,
} from '../../../components'
import { icons, nodeList, rootPane } from './panes'
import { color, styles } from './style'
import { tabBarConfig } from './tab-bar'
import css from './style/index.module.css'

const localStorageKey = 'react-tile-pane-left-tab-layout'

function PaneIcon({ name }: { name: keyof typeof icons }) {
  const getLeaf = useGetLeaf()
  const move = useMovePane()
  const leaf = getLeaf(name)
  const isShowing = !!leaf
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: 60,
        background: color.backL,
        fontSize: 30,
        padding: 10,
        marginLeft: 5,
        marginRight: 5,
      }}
    >
      <div style={{ width: 40, height: 40, cursor: 'move' }}>
        <DraggableTitle name={name}>{icons[name]}</DraggableTitle>
      </div>
      <div
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
}

export const LeftTabDemo: React.FC = () => {
  const localRoot = localStorage.getItem(localStorageKey)
  const root = localRoot
    ? (JSON.parse(localRoot) as TileBranchSubstance)
    : rootPane
  return (
    <TileProvider
      tilePanes={nodeList}
      rootNode={root}
      tabBar={tabBarConfig}
      stretchBar={{
        className: css.stretchBar,
        style: (isRow) => ({ cursor: isRow ? 'ew-resize' : 'ns-resize' }),
        position: 'previous',
      }}
    >
      <TileContainer style={styles.container} />
      <div style={{ display: 'flex', marginTop: 10 }}>
        {(Object.keys(icons) as (keyof typeof icons)[]).map((name) => (
          <PaneIcon key={name} {...{ name }} />
        ))}
      </div>
      {/* <AutoSaveLayout /> */}
    </TileProvider>
  )
}

function AutoSaveLayout() {
  const getRootNode = useGetRootNode()
  console.debug('[rootNode]', getRootNode())
  // localStorage.setItem(localStorageKey, JSON.stringify(getRootNode()))
  return <></>
}
