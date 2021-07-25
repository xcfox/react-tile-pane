import { useContext, useMemo } from 'react'
import {
  ContainerRectContext,
  TileBranchesContext,
  TileLeavesContext,
  TabsBarContext,
  absolute2Relative,
  TitleRectsContext,
  Vector2,
} from '../../../..'
import { useThrottleFn } from '../../../hook'
import { calcLeafWithTitleRect, calcPreBox } from '../util'

export function useCalcPreBox(position: Vector2, throttle?: number) {
  const containerRect = useContext(ContainerRectContext)
  const branches = useContext(TileBranchesContext)
  const leaves = useContext(TileLeavesContext)
  const { preBox: preBoxInTabBar } = useContext(TabsBarContext)
  const titleRects = useContext(TitleRectsContext)

  const leafWithTitleRects = useMemo(
    () => calcLeafWithTitleRect(titleRects, leaves),
    [leaves, titleRects]
  )

  const innerPosition = useMemo(
    () => absolute2Relative(containerRect, ...position),
    [containerRect, position]
  )

  const calcLazyPreBox = useThrottleFn(calcPreBox, throttle)
  const paneWithPreBox = useMemo(
    () =>
      calcLazyPreBox(
        branches,
        leaves,
        leafWithTitleRects,
        innerPosition,
        preBoxInTabBar
      ),
    [
      branches,
      calcLazyPreBox,
      innerPosition,
      leafWithTitleRects,
      leaves,
      preBoxInTabBar,
    ]
  )
  return { paneWithPreBox, leafWithTitleRects }
}
