import { TitlePane, TitlePaneInterface } from './TitlePane'

export function initRootPane(rootPane: TitlePaneInterface): TitlePane {
  return new TitlePane({
    ...rootPane,
    top: 0,
    left: 0,
    width: 1,
    height: 1,
  })
}
