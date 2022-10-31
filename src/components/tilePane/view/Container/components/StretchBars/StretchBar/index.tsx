import React, { useCallback, useContext, useMemo } from 'react'
import { useDrag } from '@use-gesture/react'
import { ContainerRectContext, StretchBarConfigContext } from '../../../..'
import { StretchBarEntity } from '../../../../..'
import { useThrottleMove } from './hook'
import { calcBarStyles } from './util'

export interface StretchBarProps {
  bar: StretchBarEntity
}

const StretchBarInner: React.FC<StretchBarProps> = ({ bar }) => {
  const { isRow } = bar.parentPane
  const containerRect = useContext(ContainerRectContext)
  const {
    style,
    className,
    child,
    position = 'previous',
  } = useContext(StretchBarConfigContext)
  const move = useThrottleMove(bar)

  const styled = useMemo(
    () => (typeof style === 'function' ? style(isRow) : style),
    [isRow, style]
  )

  const classNamed = useMemo(
    () => (typeof className === 'function' ? className(isRow) : className),
    [className, isRow]
  )
  const children = useMemo(
    () => (typeof child === 'function' ? child(isRow) : child),
    [child, isRow]
  )

  const moveBar = useCallback(
    (mx: number, my: number) => {
      const distance = isRow
        ? mx / containerRect.width
        : my / containerRect.height
      move(distance)
    },
    [containerRect.height, containerRect.width, isRow, move]
  )

  const bind = useDrag(
    ({ down, delta: [mx, my] }) => {
      down && moveBar(mx, my)
    },
    { enabled: true }
  )
  const { top, left, width, height } = bar.nextPane.rect

  return useMemo(
    () => (
      <div
        {...bind()}
        className={classNamed}
        style={{
          ...styled,
          position: 'absolute',
          touchAction: 'none',
          ...calcBarStyles(
            { top, left, width, height },
            positionToOffset(position),
            isRow
          ),
        }}
      >
        {children}
      </div>
    ),
    [
      bind,
      children,
      classNamed,
      height,
      isRow,
      left,
      position,
      styled,
      top,
      width,
    ]
  )
}

export const StretchBar = React.memo(StretchBarInner)

function positionToOffset(
  position: 'middle' | 'previous' | 'next' = 'middle'
): number {
  switch (position) {
    case 'previous':
      return -100
    case 'next':
      return -0
    default:
      return -50
  }
}
