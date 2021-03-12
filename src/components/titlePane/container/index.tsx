import React, { memo, useMemo } from 'react'
import useMeasure from 'react-use-measure'
import { TitlePaneInterface } from '../util'
import { StretchBar } from './components'
import { useInitContainer } from './hook'
import { toStyles } from './util'
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
  const { panes, stretchBars, reCalcPane } = useInitContainer(rootPane)

  const panesWithReactChild = panes.filter((p) =>
    React.isValidElement(p.children)
  )
  const [targetRef, containerRect] = useMeasure({ scroll: true })

  return useMemo(
    () => (
      <Provider {...{ reCalcPane, containerRect }}>
        <div ref={targetRef} style={{ position: 'relative', width, height }}>
          {panesWithReactChild.map((p, i) => (
            <div
              style={{
                position: 'absolute',
                // border: 'solid',
                ...toStyles(p.position),
              }}
              key={p.id ?? i}
            >
              {p.children}
            </div>
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
