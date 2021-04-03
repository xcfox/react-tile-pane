import React, { useCallback, useContext, useMemo } from 'react'
import { useDrag } from 'react-use-gesture'
import {
  ContainerRectContext,
  StretchBarConfigContext,
  TileDispatchContext,
} from '../../../..'
import { StretchBarEntity } from '../../../../..'
import { calcBarStyles } from './util'

export interface StretchBarProps {
  bar: StretchBarEntity
}

const StretchBarInner: React.FC<StretchBarProps> = ({ bar }) => {
  const { isRow } = bar.parentPane
  const containerRect = useContext(ContainerRectContext)
  const dispatch = useContext(TileDispatchContext)
  const { thickness, style, className } = useContext(StretchBarConfigContext)

  const styled = useMemo(
    () => (typeof style === 'function' ? style(isRow) : style),
    [isRow, style]
  )

  const classNamed = useMemo(
    () => (typeof className === 'function' ? className(isRow) : className),
    [className, isRow]
  )

  const moveBar = useCallback(
    (mx: number, my: number) => {
      const distance = isRow
        ? mx / containerRect.width
        : my / containerRect.height
      dispatch({
        barToMove: {
          bar,
          distance,
        },
      })
    },
    [bar, containerRect.height, containerRect.width, dispatch, isRow]
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
          ...calcBarStyles({ top, left, width, height }, thickness, isRow),
        }}
      />
    ),
    [bind, classNamed, height, isRow, left, styled, thickness, top, width]
  )
}

export const StretchBar = React.memo(StretchBarInner)
