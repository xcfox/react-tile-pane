import React, { memo, useMemo } from 'react'
import useMeasure from 'react-use-measure'
import { isTileNodeIDs, TileNode, TitlePaneInterface } from '../util'
import { Pane, PaneWithTileNodeChildren, StretchBar } from './components'
import { useContainer } from './hook'
import { Provider } from './model'

export interface PaneContainerProps {
  tileNodeList: TileNode[]
  rootPane: TitlePaneInterface
  width?: string | number
  height?: string | number
}

const PaneContainerInner: React.FC<PaneContainerProps> = ({
  tileNodeList,
  rootPane,
  width = '100%',
  height = '100%',
}) => {
  const { panes, stretchBars, reCalcPane } = useContainer(rootPane)

  const panesWithReactChild = panes.filter((p) =>
    isTileNodeIDs(p.children)
  ) as PaneWithTileNodeChildren[]
  const [targetRef, containerRect] = useMeasure({ scroll: true })

  return useMemo(
    () => (
      <Provider {...{ reCalcPane, containerRect, tileNodeList }}>
        <div ref={targetRef} style={{ position: 'relative', width, height }}>
          {panesWithReactChild.map((pane, i) => (
            <Pane pane={pane} key={pane.id ?? i} />
          ))}
          {stretchBars.map((b, i) => (
            <StretchBar bar={b} key={b.nextPane.id ?? i} />
          ))}
        </div>
      </Provider>
    ),
    [
      reCalcPane,
      containerRect,
      tileNodeList,
      targetRef,
      width,
      height,
      panesWithReactChild,
      stretchBars,
    ]
  )
}

export const PaneContainer = memo(PaneContainerInner)
