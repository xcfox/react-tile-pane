import { CSSProperties, useContext, useMemo } from 'react'
import {
  TabsBarContext,
  TabsBarPosition,
  TileNodeRect,
} from '../../../../../../..'

export function useStyle(rect: TileNodeRect | null): CSSProperties {
  const tabBar = useContext(TabsBarContext)
  const { position } = tabBar
  const [isVertical, isAfter] = useMemo(
    () => [
      (['top', 'bottom'] as TabsBarPosition[]).includes(position),
      (['right', 'bottom'] as TabsBarPosition[]).includes(position),
    ],
    [position]
  )
  const thickness = useMemo(
    () =>
      typeof tabBar.thickness === 'number'
        ? `${tabBar.thickness}px`
        : tabBar.thickness,
    [tabBar.thickness]
  )
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

function toCssLength(length: number) {
  return `${length * 100}%`
}

function toCssCalcLength(percent: number, offset: string, mode: '+' | '-') {
  return `calc(${toCssLength(percent)} ${mode} ${offset})`
}
