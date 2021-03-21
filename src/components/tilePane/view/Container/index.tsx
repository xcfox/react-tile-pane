import React, { memo, useContext, useMemo } from 'react'
import { ContainerRefContext } from '..'
import { usePanes } from './hook'

export interface TileContainerProps {
  width?: string | number
  height?: string | number
}

const TileContainerInner: React.FC<TileContainerProps> = ({
  width = '100%',
  height = '100%',
}) => {
  const targetRef = useContext(ContainerRefContext)
  const panes = usePanes()
  return useMemo(
    () => (
      <div ref={targetRef} style={{ position: 'relative', width, height }}>
        this is your TileContainer
      </div>
    ),
    [height, targetRef, width]
  )
}

export const TileContainer = memo(TileContainerInner)
