import React from 'react'
import {
  DraggableTitle,
  TileContainer,
  TileProvider,
  useGetLeaf,
  useMovePane,
  useGetRootNode,
  TileBranchSubstance,
  createTilePanes,
} from 'components'
import { color, styles, theme } from 'theme/left-tab'
import 'theme/left-tab/styles.css'

const localStorageKey = 'react-tile-pane-left-tab-layout'

const nodes = {
  pineapple: <div style={styles.pane}>pineapple</div>,
  banana: <div style={styles.pane}>banana</div>,
  lemon: <div style={styles.pane}>lemon</div>,
  grape: <div style={styles.pane}>grape</div>,
  kiwifruit: <div style={styles.pane}>kiwifruit</div>,
}

export type nodeNames = keyof typeof nodes

export const icons: Record<nodeNames, string> = {
  banana: '🍌',
  pineapple: '🍍',
  lemon: '🍋',
  grape: '🍇',
  kiwifruit: '🥝',
}

export const [nodeList, names] = createTilePanes(nodes)

export const rootPane: TileBranchSubstance = {
  children: [
    { children: [names.pineapple, names.banana] },
    {
      isRow: true,
      grow: 2,
      children: [
        {
          isRow: true,
          children: [
            { children: [names.lemon, names.grape], grow: 3 },
            { children: names.kiwifruit },
          ],
        },
      ],
    },
  ],
}

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
    <TileProvider tilePanes={nodeList} rootNode={root} {...theme(icons)}>
      <TileContainer style={styles.container} />
      <div style={{ display: 'flex', marginTop: 10 }}>
        {(Object.keys(icons) as (keyof typeof icons)[]).map((name) => (
          <PaneIcon key={name} {...{ name }} />
        ))}
      </div>
      <AutoSaveLayout />
    </TileProvider>
  )
}

function AutoSaveLayout() {
  const getRootNode = useGetRootNode()
  localStorage.setItem(localStorageKey, JSON.stringify(getRootNode()))
  return <></>
}
