import { TilePaneEntity, calcChildGrows, isTileNodeIDs } from '..'

export function reCalcChildGrow(this: TilePaneEntity) {
  const { children } = this
  if (isTileNodeIDs(children)) return
  const grows = calcChildGrows(children)
  children.forEach((child, i) => {
    child.grow = grows[i]
    child.indexInParent = i
  })
}
