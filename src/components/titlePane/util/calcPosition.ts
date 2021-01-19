import {
  TitlePane,
  TitlePaneConstructor,
  TitlePaneInterface,
} from './TitlePane'

type ChildPosition = {
  top: number
  left: number
  width: number
  height: number
}

export function calcPosition(
  parent: TitlePane,
  children: TitlePaneInterface[]
): TitlePaneConstructor[] {
  const { isRow, top, left, width, height } = parent
  const growsSolid = children.map((c) => c.grow ?? 1)
  const growSum = growsSolid.reduce((s, n) => (s += n)) // 部分值
  const grows = growsSolid.map((c) => c / growSum) // 相对值

  const positions = calcChildPosition()
  return positions.map((p, i) => ({
    ...children[i],
    ...p,
    parent,
  }))

  function calcChildPosition(): ChildPosition[] {
    if (isRow) {
      const childLeft = grows.map((it, i, arr) => {
        // 计算子元素 left
        if (i === 0) {
          return left
        } else {
          return arr[i - 1] + width * grows[i - 1]
        }
      })
      return grows.map((n, i) => ({
        top,
        height,
        width: n * width,
        left: childLeft[i],
      }))
    } else {
      const childTop = grows.map((it, i, arr) => {
        // 计算子元素 top
        if (i === 0) {
          return top
        } else {
          return arr[i - 1] + height * grows[i - 1]
        }
      })
      return grows.map((n, i) => ({
        left,
        width,
        height: n * height,
        top: childTop[i],
      }))
    }
  }
}
