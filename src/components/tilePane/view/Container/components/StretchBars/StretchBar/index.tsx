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
  const containerRect = useContext(ContainerRectContext)
  const dispatch = useContext(TileDispatchContext)
  const { thickness } = useContext(StretchBarConfigContext)
  const moveBar = useCallback(
    (mx: number, my: number) => {
      const distance = bar.parentPane.isRow
        ? mx / containerRect.width
        : my / containerRect.height
      dispatch({
        barToMove: {
          bar,
          distance,
        },
      })
    },
    [bar, containerRect.height, containerRect.width, dispatch]
  )

  const bind = useDrag(
    ({ down, delta: [mx, my] }) => {
      down && moveBar(mx, my)
    },
    { enabled: true }
  )
  const { top, left, width, height } = bar.nextPane.rect
  const { isRow } = bar.parentPane

  return useMemo(
    () => (
      <div
        {...bind()}
        style={{
          position: 'absolute',
          background: '#8191ec66',
          ...calcBarStyles({ top, left, width, height }, thickness, isRow),
        }}
      />
    ),
    [bind, height, isRow, left, thickness, top, width]
  )
}

export const StretchBar = React.memo(StretchBarInner)
