import React, { memo, useContext, useMemo } from 'react'
import { ContainerRefContext, MovingTabsContext } from '..'
import { StretchBars, TabsBars, TilePanes } from './components'

export interface TileContainerProps {
  style?: React.CSSProperties
  className?: string
}

const TileContainerInner: React.FC<TileContainerProps> = ({
  style = { width: '100%', height: '100%' },
  className,
}) => {
  const targetRef = useContext(ContainerRefContext)
  const movingTabs = useContext(MovingTabsContext)
  return useMemo(
    () => (
      <div
        ref={targetRef}
        className={className}
        style={{
          ...style,
          position: 'relative',
          userSelect: movingTabs.length ? 'none' : 'auto',
        }}
      >
        <TabsBars />
        <TilePanes />
        <StretchBars />
      </div>
    ),
    [className, movingTabs.length, style, targetRef]
  )
}

export const TileContainer = memo(TileContainerInner)
export * from './utils'
export * from './components'
