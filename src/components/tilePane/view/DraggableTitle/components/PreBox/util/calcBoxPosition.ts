import { RectReadOnly } from 'react-use-measure'
import { isTileLeaf, TileNodeRect } from '../../../../../model'
import { PaneWithPreBox } from '../../../typings'
import { proportion } from '..'
import { LeafWithTitleRect } from '.'

export function calcBoxPosition(
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
    default:
      return {
        top: containerRect.top + top * containerRect.height,
        left: containerRect.left + left * containerRect.width,
        height: containerRect.height * height,
        width: containerRect.width * width,
      }
  }
}

const width = 0.02
export function calcTitleBoxPosition(
  paneWithPreBox: PaneWithPreBox | undefined,
  leafWithTitleRects: LeafWithTitleRect[]
): TileNodeRect | undefined {
  if (!paneWithPreBox) return
  const { targetNode, into } = paneWithPreBox
  if (typeof into !== 'number') return
  if (!isTileLeaf(targetNode)) return
  const { children } = targetNode
  const previousTitle = children[into - 1]
  const currentTitle = children[into] ?? children[into - 1]
  const previous = leafWithTitleRects.find((it) => it.title === previousTitle)
  const current = leafWithTitleRects.find((it) => it.title === currentTitle)

  if (previous && current) {
    const { top, height, left: cL } = current.titleRect
    const { left: pL, width: pW } = previous.titleRect
    return { top, height, left: (cL + pL + pW - width) / 2, width }
  } else if (current) {
    const { top, left, height } = current.titleRect
    return { top, left, height, width }
  } else if (previous) {
    const { top, left, height } = previous.titleRect
    return { top, left, height, width }
  }
}

export function toInContainer(
  rect: TileNodeRect | undefined,
  containerRect: RectReadOnly
): TileNodeRect | undefined {
  if (!rect) return
  const { top, left, width, height } = rect
  return {
    top: containerRect.top + top * containerRect.height,
    left: containerRect.left + left * containerRect.width,
    height: containerRect.height * height,
    width: containerRect.width * width,
  }
}
