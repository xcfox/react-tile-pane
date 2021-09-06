import { RectReadOnly } from 'react-use-measure'
import { TileNodeRect } from '../../../../../model'
import { PaneWithPreBox } from '../../../typings'
import { proportion } from '..'
import { LeafWithTitleRect } from '.'
import { TabsBarConfig } from '../../../..'

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

const thickness = 0.01
export function calcTitleBoxPosition(
  paneWithPreBox: PaneWithPreBox | undefined,
  leafWithTitleRects: LeafWithTitleRect[],
  config: TabsBarConfig['preBox']
): TileNodeRect | undefined {
  if (!paneWithPreBox?.tab) return
  const { target, into, hasNext: isNext } = paneWithPreBox.tab
  const { children } = target
  const currentTitle = children[into]
  const current = leafWithTitleRects.find((it) => it.title === currentTitle)

  if (current) {
    const { top, left, height, width } = current.rect
    const isEnd = config?.isReverse ? !isNext : isNext
    const intoLeft = { top, left, height, width: thickness }
    const intoRight = {
      top,
      height,
      width: thickness,
      left: left + width - thickness,
    }
    const intoTop = { top, left, height: thickness, width }
    const intoBottom = {
      top: top + height - thickness,
      height: thickness,
      width,
      left,
    }
    const intoPrev = config?.isRow ? intoLeft : intoTop
    const intoNext = config?.isRow ? intoRight : intoBottom
    return isEnd ? intoNext : intoPrev
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
