import React, { memo, useContext, useMemo } from 'react'
import { isTileNodeIDs } from '../util'
import { Pane, PaneWithTileNodeChildren, StretchBar } from './components'
import {
  PaneProvider,
  ProviderOptionProps,
  ContainerContext,
  ContainerRefContext,
} from './model'

export interface PaneContainerProps {
  width?: string | number
  height?: string | number
}

const PaneContainerInner: React.FC<PaneContainerProps> = ({
  width = '100%',
  height = '100%',
}) => {
  const { panes, stretchBars } = useContext(ContainerContext)
  const targetRef = useContext(ContainerRefContext)

  const panesWithReactChild = panes.filter((p) =>
    isTileNodeIDs(p.children)
  ) as PaneWithTileNodeChildren[]

  return useMemo(
    () => (
      <div ref={targetRef} style={{ position: 'relative', width, height }}>
        {panesWithReactChild.map((pane, i) => (
          <Pane pane={pane} key={pane.id ?? i} />
        ))}
        {stretchBars.map((b, i) => (
          <StretchBar bar={b} key={b.nextPane.id ?? i} />
        ))}
      </div>
    ),
    [targetRef, width, height, panesWithReactChild, stretchBars]
  )
}

export const PaneContainer = memo(PaneContainerInner)

export const PaneContainerWithProvider: React.FC<
  ProviderOptionProps & PaneContainerProps
> = ({ width, height, ...rest }) => {
  return useMemo(
    () => (
      <PaneProvider {...rest}>
        <PaneContainer {...{ width, height }} />
      </PaneProvider>
    ),
    [height, rest, width]
  )
}

export { PaneProvider }
