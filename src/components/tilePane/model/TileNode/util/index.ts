import { TileBranch, TileNodeRect } from '..'

export * from './dehydrate'

export function calcChildGrows(children: { grow?: number }[]) {
  const growsSolid = children.map((c) => c.grow ?? 1)
  const growSum = growsSolid.reduce((s, n) => (s += n), 0) // 部分值
  const grows = growsSolid.map((c) => c / growSum) // 相对值
  return grows
}

export function calcChildRects(
  parent: TileBranch,
  grows: number[]
): TileNodeRect[] {
  const { isRow, rect } = parent
  const { top, left, width, height } = rect
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
