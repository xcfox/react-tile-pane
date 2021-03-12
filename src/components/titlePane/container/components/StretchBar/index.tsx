import React, { memo, useCallback, useContext, useMemo } from 'react'
import { useDrag } from 'react-use-gesture'
import { PanePosition, StretchBarEntity } from '../../..'
import { ContainerRectContext, UpdateManuallyContext } from '../../model'
import { calcBarStyles } from './util'

export interface StretchBarProps {
  bar: StretchBarEntity
}

export const StretchBar: React.FC<StretchBarProps> = ({ bar }) => {
  const containerRect = useContext(ContainerRectContext)
  const update = useContext(UpdateManuallyContext)
  const moveBar = useCallback(
    (mx: number, my: number) => {
      const distance = bar.parentPane.isRow
        ? mx / containerRect.width
        : my / containerRect.height
      bar.move(distance)
      update()
    },
    [bar, containerRect.height, containerRect.width, update]
  )

  const bind = useDrag(
    ({ down, movement: [mx, my] }) => {
      down && moveBar(mx / 100, my / 100)
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

// export const StretchBar = memo(StretchBarInner, (prev, next) => {
//   const keys = Object.keys(prev.bar.nextPane.position) as (keyof PanePosition)[]
//   for (const key of keys) {
//     if (!(prev.bar.nextPane.position[key] === next.bar.nextPane.position[key]))
//       return false
//   }
//   return true
// })
