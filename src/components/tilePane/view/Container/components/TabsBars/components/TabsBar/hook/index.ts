import { CSSProperties, useContext, useMemo } from 'react'
import {
  completeUnit,
  TabsBarContext,
  TileNodeRect,
  toCssLength,
  toQuadrant,
} from '../../../../../../..'
export function useStyle(rect: TileNodeRect): CSSProperties {
  const table = useContext(TabsBarContext)
  const { position } = table
  const [isVertical, isAfter] = useMemo(() => toQuadrant(position), [position])
  const thickness = useMemo(() => completeUnit(table.thickness), [table])
  return {
    position: 'absolute',
    width: isVertical ? toCssLength(rect.width) : thickness,
    height: isVertical ? thickness : toCssLength(rect.height),
    top: isAfter ? undefined : toCssLength(rect.top),
    bottom: isAfter ? toCssLength(1 - rect.top - rect.height) : undefined,
    left: isAfter ? undefined : toCssLength(rect.left),
    right: isAfter ? toCssLength(1 - rect.left - rect.width) : undefined,
  }
}
