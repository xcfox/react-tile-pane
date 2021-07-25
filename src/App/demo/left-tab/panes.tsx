import React from 'react'
import { createTilePanes, TileBranchSubstance } from '../../../components'

import { styles } from './style'

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
