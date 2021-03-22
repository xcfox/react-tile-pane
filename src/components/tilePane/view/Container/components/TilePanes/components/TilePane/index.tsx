import React, { memo, useMemo } from 'react'
import { TilePaneWithRect } from '../../../../../..'
import { useChild, useStyle } from './hook'

export interface TilePaneProps {
  pane: TilePaneWithRect
}
const TilePaneInner: React.FC<TilePaneProps> = ({ pane }) => {
  const child = useChild(pane.name)
  const style = useStyle(pane.rect)
  return useMemo(() => <div style={style}>{child}</div>, [child, style])
}
export const TilePane = memo(TilePaneInner)
