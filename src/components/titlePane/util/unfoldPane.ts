import { TitlePaneEntity } from '.'

export function unfoldPane(pane: TitlePaneEntity): TitlePaneEntity[] {
  const panes: TitlePaneEntity[] = []
  unfold(pane)
  function unfold(pane: TitlePaneEntity) {
    const { children } = pane
    if (children instanceof Array) {
      children.forEach((c) => unfold(c))
      panes.push(...children)
    }
  }
  return panes
}
