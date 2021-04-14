import React, { memo, useContext, useMemo } from 'react'
import { Vector2 } from 'react-use-gesture/dist/types'
import {
  absolute2Relative,
  ContainerRectContext,
  PreBoxConfigContext,
  TabsBarContext,
  TileBranchesContext,
  TileLeavesContext,
  TitleRectsContext,
} from '../../..'
import { useThrottleFn } from '../../hook'
import { PaneWithPreBox } from '../../typings'
import {
  calcPreBox,
  calcBoxPosition,
  calcLeafWithTitleRect,
  calcTitleBoxPosition,
  toInContainer,
} from './util'

export interface PreBoxProps {
  paneWithPreBoxRef: React.MutableRefObject<PaneWithPreBox | undefined>
  position: Vector2
}

const PreBoxInner: React.FC<PreBoxProps> = ({
  position,
  paneWithPreBoxRef,
}) => {
  const containerRect = useContext(ContainerRectContext)
  const branches = useContext(TileBranchesContext)
  const leaves = useContext(TileLeavesContext)
  const { throttle, style, className, child } = useContext(PreBoxConfigContext)
  const { preBox: preBoxInTabBar } = useContext(TabsBarContext)

  const innerPosition = useMemo(
    () => absolute2Relative(containerRect, ...position),
    [containerRect, position]
  )

  const titleRects = useContext(TitleRectsContext)
  const leafWithTitleRects = calcLeafWithTitleRect(titleRects, leaves)

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
  paneWithPreBoxRef.current = paneWithPreBox
  return useMemo(() => {
    const styled =
      typeof style === 'function' ? style(paneWithPreBox ?? {}) : style
    const classNamed =
      typeof className === 'function'
        ? className(paneWithPreBox ?? {})
        : className
    const boxPosition =
      toInContainer(
        calcTitleBoxPosition(
          paneWithPreBox,
          leafWithTitleRects,
          preBoxInTabBar
        ),
        containerRect
      ) ?? calcBoxPosition(paneWithPreBox, containerRect)
    const children =
      typeof child === 'function' ? child(paneWithPreBox ?? {}) : child

    return (
      <div
        className={classNamed}
        style={{
          ...styled,
          zIndex: 1,
          visibility: 'visible',
          position: 'fixed',
          ...boxPosition,
        }}
      >
        {children}
      </div>
    )
  }, [
    child,
    className,
    containerRect,
    leafWithTitleRects,
    paneWithPreBox,
    preBoxInTabBar,
    style,
  ])
}

export const proportion = 0.5
export const PreBox = memo(PreBoxInner)
