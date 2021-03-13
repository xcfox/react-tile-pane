import React, { memo, useMemo } from 'react'
import useMeasure from 'react-use-measure'
import { TitlePaneInterface } from '../util'
import { Pane, StretchBar } from './components'
import { useContainer } from './hook'
import { Provider } from './model'

export interface PaneContainerProps {
  rootPane: TitlePaneInterface
  width?: string | number
  height?: string | number
}

const PaneContainerInner: React.FC<PaneContainerProps> = ({
  rootPane,
  width = '100%',
  height = '100%',
}) => {
  const { panes, stretchBars, reCalcPane } = useContainer(rootPane)

  const panesWithReactChild = panes.filter((p) =>
    React.isValidElement(p.children)
  )
  const [targetRef, containerRect] = useMeasure({ scroll: true })

  return useMemo(
    () => (
      <Provider {...{ reCalcPane, containerRect }}>
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
      targetRef,
      width,
      height,
      panesWithReactChild,
      stretchBars,
    ]
  )
}

export const PaneContainer = memo(PaneContainerInner)
