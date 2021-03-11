import { StretchBarEntity, TilePaneEntity } from '.'

export function unfoldPane(pane: TilePaneEntity) {
  const panes: TilePaneEntity[] = []
  const stretchBars: StretchBarEntity[] = []
  unfold(pane)
  function unfold(pane: TilePaneEntity) {
    const { children, stretchBars: bars } = pane
    if (children instanceof Array) {
      children.forEach(unfold)
      panes.push(...children)
      bars && stretchBars.push(...bars)
    }
  }
  return {
    panes,
    stretchBars,
  }
}
