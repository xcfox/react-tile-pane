import React from 'react'
import { createTilePanes, TileBranchSubstance } from '../../../components'

import { styles } from './style'

const nodes = {
  pineapple: <div style={styles.pane}>菠萝</div>,
  banana: <div style={styles.pane}>香蕉</div>,
  lemon: <div style={styles.pane}>柠檬</div>,
  grape: <div style={styles.pane}>葡萄</div>,
  kiwifruit: <div style={styles.pane}>猕猴桃</div>,
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
