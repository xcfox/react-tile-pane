import React, { memo, useContext, useMemo } from 'react'
import { Vector2 } from 'react-use-gesture/dist/types'
import { RectReadOnly } from 'react-use-measure'
import {
  calcPreBox,
  Into,
  PanePosition,
  PaneWithPreBox,
  TilePaneEntity,
} from '../../..'
import {
  ContainerRectContext,
  ContainerContext,
} from '../../../container/model'

export interface PreBoxProps {
  paneWithPreBoxRef: React.MutableRefObject<PaneWithPreBox | undefined>
  position: Vector2
}

const PreBoxInner: React.FC<PreBoxProps> = ({
  position,
  paneWithPreBoxRef,
}) => {
  const containerRect = useContext(ContainerRectContext)
  const { panes } = useContext(ContainerContext)
  const innerPosition = useMemo(() => {
    return [
      (position[0] - containerRect.left) / containerRect.width,
      (position[1] - containerRect.top) / containerRect.height,
    ] as Vector2
  }, [containerRect, position])
  const paneWithPreBox = useMemo(() => calcPreBox(panes, innerPosition), [
    innerPosition,
    panes,
  ])
  paneWithPreBoxRef.current = paneWithPreBox
  return useMemo(() => {
    if (!paneWithPreBox) return null
    const boxPosition = calcBoxPosition(paneWithPreBox, containerRect)

    return (
      <div
        style={{
          zIndex: 1,
          background: '#e4a4fd66',
          position: 'fixed',
          ...boxPosition,
        }}
      />
    )
  }, [containerRect, paneWithPreBox])
}

const proportion = 0.5
export const PreBox = memo(PreBoxInner)

function calcBoxPosition(
  paneWithPreBox: {
    pane: TilePaneEntity
    into: Into
  },
  containerRect: RectReadOnly
): PanePosition {
  const { pane, into } = paneWithPreBox
  const { top, left, width, height } = pane.position

  switch (into) {
    case 'center':
      return {
        top: containerRect.top + top * containerRect.height,
        left: containerRect.left + left * containerRect.width,
        height: containerRect.height * height,
        width: containerRect.width * width,
      }
    case 'left':
      return {
        top: containerRect.top + top * containerRect.height,
        left: containerRect.left + left * containerRect.width,
        height: containerRect.height * height,
        width: containerRect.width * width * proportion,
      }
    case 'right':
      return {
        top: containerRect.top + top * containerRect.height,
        left:
          containerRect.left +
          left * containerRect.width +
          containerRect.width * width * (1 - proportion),
        height: containerRect.height * height,
        width: containerRect.width * width * proportion,
      }
    case 'top':
      return {
        top: containerRect.top + top * containerRect.height,
        left: containerRect.left + left * containerRect.width,
        height: containerRect.height * height * proportion,
        width: containerRect.width * width,
      }
    case 'bottom':
      return {
        top:
          containerRect.top +
          top * containerRect.height +
          containerRect.height * height * (1 - proportion),
        left: containerRect.left + left * containerRect.width,
        height: containerRect.height * height * proportion,
        width: containerRect.width * width,
      }
  }
}
