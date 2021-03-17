import { isTileNodeIDs, StretchBarEntity, TilePaneEntity } from '..'

export function unfoldPane(pane: TilePaneEntity) {
  const panes: TilePaneEntity[] = [pane]
  const stretchBars: StretchBarEntity[] = []
  unfold(pane)
  function unfold(pane: TilePaneEntity) {
    const { children } = pane
    !isTileNodeIDs(children) &&
      children.forEach((p, i) => {
        unfold(p)
        panes.push(p)
        const prevPane = children[i - 1]
        if (!prevPane) return
        if (p.grow === 0) return
        const bar = new StretchBarEntity(pane, prevPane, p)
        stretchBars.push(bar)
      })
  }
  return {
    panes,
    stretchBars,
  }
}
