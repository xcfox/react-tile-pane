import { TitlePane, TitlePaneInterface } from './TitlePane'

export function initRootPane(rootPane: TitlePaneInterface): TitlePane {
  return new TitlePane(rootPane)
}
