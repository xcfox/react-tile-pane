import { TitlePane } from '.'

export function unfoldPane(pane: TitlePane): TitlePane[] {
  const panes: TitlePane[] = []
  unfold(pane)
  function unfold(pane: TitlePane) {
    const { children } = pane
    if (children instanceof Array) {
      children.forEach((c) => unfold(c))
      panes.push(...children)
    }
  }
  return panes
}
