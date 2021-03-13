import React, { useCallback, useContext, useMemo } from 'react'
import { useDrag } from 'react-use-gesture'
import { StretchBarEntity } from '../../..'
import { ContainerRectContext, UpdateManuallyContext } from '../../model'
import { calcBarStyles } from './util'

export interface StretchBarProps {
  bar: StretchBarEntity
}

export const StretchBar: React.FC<StretchBarProps> = ({ bar }) => {
  const containerRect = useContext(ContainerRectContext)
  const calcLayout = useContext(UpdateManuallyContext)
  const moveBar = useCallback(
    (mx: number, my: number) => {
      const distance = bar.parentPane.isRow
        ? mx / containerRect.width
        : my / containerRect.height
      bar.move(distance)
      calcLayout()
    },
    [bar, containerRect.height, containerRect.width, calcLayout]
  )

  const bind = useDrag(
    ({ down, delta: [mx, my] }) => {
      down && moveBar(mx, my)
    },
    { enabled: true }
  )
  const { top, left, width, height } = bar.nextPane.position
  const { isRow } = bar.parentPane

  return useMemo(
    () => (
      <div
        {...bind()}
        style={{
          position: 'absolute',
          background: '#81ec8166',
          ...calcBarStyles({ top, left, width, height }, isRow),
        }}
      />
    ),
    [bind, height, isRow, left, top, width]
  )
}
