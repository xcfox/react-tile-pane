import React, { memo, useContext, useMemo } from 'react'
import { PaneContext, TilePaneWithRect } from '../../../../../..'
import { useChild, useStyle } from './hook'

export interface TilePaneProps {
  pane: TilePaneWithRect
}
const TilePaneInner: React.FC<TilePaneProps> = ({ pane }) => {
  const { style, className } = useContext(PaneContext)
  const child = useChild(pane.name)
  const styled = useStyle(pane.rect)
  return useMemo(
    () => (
      <div className={className} style={{ ...style, ...styled }}>
        {child}
      </div>
    ),
    [child, className, style, styled]
  )
}
export const TilePane = memo(TilePaneInner)
