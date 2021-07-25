import React from 'react'
import { TileContainer, TileProvider } from '../../../components'
import { nodeList, rootPane } from './panes'
import { styles } from './style'
import { tabBarConfig } from './tab-bar'
import css from './style/index.module.css'

export const LeftTabDemo: React.FC = () => {
  return (
    <TileProvider
      tilePanes={nodeList}
      rootNode={rootPane}
      tabBar={tabBarConfig}
      stretchBar={{
        className: css.stretchBar,
        style: (isRow) => ({ cursor: isRow ? 'ew-resize' : 'ns-resize' }),
        position: 'front',
      }}
    >
      <TileContainer style={styles.container} />
    </TileProvider>
  )
}
