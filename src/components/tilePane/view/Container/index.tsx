import React, { memo, useContext, useMemo } from 'react'
import { ContainerRefContext } from '..'
import { TilePanes } from './components'

export interface TileContainerProps {
  width?: string | number
  height?: string | number
}

const TileContainerInner: React.FC<TileContainerProps> = ({
  width = '100%',
  height = '100%',
}) => {
  const targetRef = useContext(ContainerRefContext)
  return useMemo(
    () => (
      <div ref={targetRef} style={{ position: 'relative', width, height }}>
        <TilePanes />
      </div>
    ),
    [height, targetRef, width]
  )
}

export const TileContainer = memo(TileContainerInner)
