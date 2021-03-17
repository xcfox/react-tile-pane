import React, { useCallback, useContext, useMemo } from 'react'
import { useDrag } from 'react-use-gesture'
import { StretchBarEntity } from '../../..'
import { OptionContext } from '../../config'
import { ContainerRectContext, UpdateManuallyContext } from '../../model'
import { calcBarStyles } from './util'

export interface StretchBarProps {
  bar: StretchBarEntity
}

const StretchBarInner: React.FC<StretchBarProps> = ({ bar }) => {
  const containerRect = useContext(ContainerRectContext)
  const calcLayout = useContext(UpdateManuallyContext)
  const { stretchBarThickness } = useContext(OptionContext)
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
    () =>
      bar.nextPane.grow ? (
        <div
          {...bind()}
          style={{
            position: 'absolute',
            background: '#8191ec66',
            ...calcBarStyles(
              { top, left, width, height },
              stretchBarThickness,
              isRow
            ),
          }}
        />
      ) : null,
    [
      bar.nextPane.grow,
      bind,
      height,
      isRow,
      left,
      stretchBarThickness,
      top,
      width,
    ]
  )
}

export const StretchBar = React.memo(StretchBarInner)
