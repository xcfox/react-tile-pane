import { RectReadOnly } from 'react-use-measure'
import { TileNodeRect } from '../../../../../model'
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
  const node = paneWithPreBox.leaf ?? paneWithPreBox.branch
  if (!node) return { top: 0, left: 0, height: 1, width: 1 }
  const { target, into } = node
  const { top, left, width, height } = target.rect

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
  if (!paneWithPreBox?.tab) return
  const { target, into, isEnd } = paneWithPreBox.tab
  const { children } = target
  const currentTitle = children[into]
  const current = leafWithTitleRects.find((it) => it.title === currentTitle)

  if (current) {
    const { top, left, height, width: w } = current.rect
    return isEnd
      ? { top, height, width, left: left + w - width }
      : { top, left, height, width }
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
