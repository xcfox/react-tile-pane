import {
  TilePaneEntity,
  TitlePaneConstructor,
  TitlePaneInterface,
} from './TitlePane'

export type PanePosition = {
  top: number
  left: number
  width: number
  height: number
}

export function calcConstructor(
  parent: TilePaneEntity,
  children: TitlePaneInterface[]
): TitlePaneConstructor[] {
  const grows = calcChildGrows(children)
  const positions = calcChildPosition(parent, grows)
  return positions.map((position, i) => ({
    ...children[i],
    position,
    parent,
    grow: grows[i],
  }))
}

export function calcChildGrows(children: TitlePaneInterface[]) {
  const growsSolid = children.map((c) => c.grow ?? 1)
  const growSum = growsSolid.reduce((s, n) => (s += n)) // 部分值
  const grows = growsSolid.map((c) => c / growSum) // 相对值
  return grows
}

export function calcChildPosition(
  parent: TilePaneEntity,
  grows: number[]
): PanePosition[] {
  const { isRow, position } = parent
  const { top, left, width, height } = position
  if (isRow) {
    const childLeft = grows.reduce<number[]>(
      (arr, n, i) => {
        // 计算子元素 left
        if (i > 0) arr.push(arr[i - 1] + width * grows[i - 1])
        return arr
      },
      [left]
    )
    return grows.map((n, i) => ({
      top,
      height,
      width: n * width,
      left: childLeft[i],
    }))
  } else {
    const childTop = grows.reduce<number[]>(
      (arr, n, i) => {
        // 计算子元素 top
        if (i > 0) arr.push(arr[i - 1] + height * grows[i - 1])
        return arr
      },
      [top]
    )
    return grows.map((n, i) => ({
      left,
      width,
      height: n * height,
      top: childTop[i],
    }))
  }
}
