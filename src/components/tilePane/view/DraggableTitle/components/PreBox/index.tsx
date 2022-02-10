import React, { memo, useContext, useMemo } from 'react'
import { Vector2 } from '@use-gesture/react'
import {
  ContainerRectContext,
  PreBoxConfigContext,
  TabsBarContext,
} from '../../..'
import { PaneWithPreBox } from '../../typings'
import { useCalcPreBox } from './hook/useCalcPreBox'
import { calcBoxPosition, calcTitleBoxPosition, toInContainer } from './util'

export interface PreBoxProps {
  paneWithPreBoxRef: React.MutableRefObject<PaneWithPreBox | undefined>
  position: Vector2
}

const PreBoxInner: React.FC<PreBoxProps> = ({
  position,
  paneWithPreBoxRef,
}) => {
  const containerRect = useContext(ContainerRectContext)
  const { throttle, style, className, child } = useContext(PreBoxConfigContext)
  const { preBox: preBoxInTabBar } = useContext(TabsBarContext)

  const { paneWithPreBox, leafWithTitleRects } = useCalcPreBox(
    position,
    throttle
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
