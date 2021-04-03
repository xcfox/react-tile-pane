import React, { memo, useContext, useMemo } from 'react'
import { Vector2 } from 'react-use-gesture/dist/types'
import { RectReadOnly } from 'react-use-measure'
import {
  ContainerRectContext,
  PreBoxConfigContext,
  PreBoxTarget,
  TileBranchesContext,
  TileLeavesContext,
} from '../../..'
import { isTileLeaf, TileNodeRect } from '../../../../model'
import { useThrottleFn } from '../../hook'
import { PaneWithPreBox } from '../../typings'
import { calcPreBox } from '../../util'

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

  const innerPosition = useMemo(() => {
    return [
      (position[0] - containerRect.left) / containerRect.width,
      (position[1] - containerRect.top) / containerRect.height,
    ] as Vector2
  }, [containerRect, position])

  const calcLazyPreBox = useThrottleFn(calcPreBox, throttle)
  const paneWithPreBox = useMemo(
    () => calcLazyPreBox(branches, leaves, innerPosition),
    [branches, calcLazyPreBox, innerPosition, leaves]
  )
  paneWithPreBoxRef.current = paneWithPreBox
  return useMemo(() => {
    const targetType = calcTargetType()
    const into = paneWithPreBox?.into ?? 'center'
    const styled = typeof style === 'function' ? style(into, targetType) : style
    const classNamed =
      typeof className === 'function' ? className(into, targetType) : className
    const boxPosition = calcBoxPosition(paneWithPreBox, containerRect)
    const children =
      typeof child === 'function' ? child(into, targetType) : child

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

    function calcTargetType(): PreBoxTarget {
      if (!paneWithPreBox) return null
      return isTileLeaf(paneWithPreBox?.targetNode ?? branches[0])
        ? 'leaf'
        : 'branch'
    }
  }, [branches, child, className, containerRect, paneWithPreBox, style])
}

const proportion = 0.5
export const PreBox = memo(PreBoxInner)

function calcBoxPosition(
  paneWithPreBox: PaneWithPreBox | undefined,
  containerRect: RectReadOnly
): TileNodeRect {
  if (!paneWithPreBox)
    return {
      top: containerRect.top,
      left: containerRect.left,
      height: containerRect.height,
      width: containerRect.width,
    }
  const { targetNode, into } = paneWithPreBox
  const { top, left, width, height } = targetNode.rect

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
