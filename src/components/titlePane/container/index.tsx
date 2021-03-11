import React, { memo, useLayoutEffect, useMemo, useRef } from 'react'
import { TitlePaneInterface } from '../util'
import { useInitContainer } from './hook'
import { calcBarStyles, toStyles } from './util'
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
  const { panes, stretchBars } = useInitContainer(rootPane)

  const panesWithReactChild = panes.filter((p) =>
    React.isValidElement(p.children)
  )

  const containerRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (containerRef.current) {
      console.log(containerRef.current)
      console.log('offsetLeft: ', containerRef.current.offsetLeft)
      console.log('offsetTop: ', containerRef.current.offsetTop)
      console.log('offsetWidth: ', containerRef.current.offsetWidth)
      console.log('offsetHeight: ', containerRef.current.offsetHeight)
    }
  })

  return useMemo(
    () => (
      <div ref={containerRef} style={{ position: 'relative', width, height }}>
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
          <div
            style={{
              position: 'absolute',
              background: '#81ec8166',
              ...calcBarStyles(b),
            }}
            key={b.nextPane.id ?? i}
          />
        ))}
      </div>
    ),
    [height, panesWithReactChild, stretchBars, width]
  )
}

export const PaneContainer = memo(PaneContainerInner)
