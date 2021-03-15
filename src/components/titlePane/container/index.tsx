import React, { memo, useContext, useMemo, useState } from 'react'
import { LeafRefs, LeavesPortal, Pane, StretchBar } from './components'
import { OptionContext } from './config'
import { initPaneLeafRefs } from './util/initPaneLeafRefs'
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
  const { paneLeaves, stretchBars } = useContext(ContainerContext)
  const targetRef = useContext(ContainerRefContext)
  const { usePortal } = useContext(OptionContext)

  const [paneLeafRefs, setPaneLeafRefs] = useState<LeafRefs[]>(
    usePortal ? initPaneLeafRefs(paneLeaves) : []
  )

  return useMemo(
    () => (
      <div ref={targetRef} style={{ position: 'relative', width, height }}>
        {paneLeaves.map((pane, i) => (
          <Pane
            key={pane.id ?? i}
            {...{ pane, setPaneLeafRefs, leafIndex: i }}
          />
        ))}
        {stretchBars.map((b, i) => (
          <StretchBar bar={b} key={b.nextPane.id ?? i} />
        ))}
        {usePortal && <LeavesPortal {...{ paneLeafRefs, paneLeaves }} />}
      </div>
    ),
    [targetRef, width, height, paneLeaves, stretchBars, usePortal, paneLeafRefs]
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
