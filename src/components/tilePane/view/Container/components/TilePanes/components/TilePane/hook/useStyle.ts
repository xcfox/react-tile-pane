import { CSSProperties, useContext, useMemo } from 'react'
import {
  completeUnit,
  TabsBarContext,
  TileNodeRect,
  toCssCalcLength,
  toCssLength,
  toQuadrant,
} from '../../../../../../..'

export function useStyle(rect: TileNodeRect | null): CSSProperties {
  const tabBar = useContext(TabsBarContext)
  const { position } = tabBar
  const [isVertical, isAfter] = useMemo(() => toQuadrant(position), [position])
  const thickness = useMemo(() => completeUnit(tabBar.thickness), [
    tabBar.thickness,
  ])
  return rect
    ? {
        position: 'absolute',
        height: isVertical
          ? toCssCalcLength(rect.height, thickness, '-')
          : toCssLength(rect.height),
        width: isVertical
          ? toCssLength(rect.width)
          : toCssCalcLength(rect.width, thickness, '-'),
        top:
          isVertical && !isAfter
            ? toCssCalcLength(rect.top, thickness, '+')
            : toCssLength(rect.top),
        left:
          !isVertical && !isAfter
            ? toCssCalcLength(rect.left, thickness, '+')
            : toCssLength(rect.left),
      }
    : {
        display: 'none',
      }
}
