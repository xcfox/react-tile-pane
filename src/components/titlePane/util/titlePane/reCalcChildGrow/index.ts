import { TilePaneEntity, calcChildGrows } from '..'

export function reCalcChildGrow(this: TilePaneEntity) {
  const { children } = this
  if (!(children instanceof Array)) return
  const grows = calcChildGrows(children)
  children.forEach((child, i) => {
    child.grow = grows[i]
    child.indexInParent = i
  })
}
