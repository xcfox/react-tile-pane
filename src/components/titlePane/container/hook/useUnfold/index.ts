import { useMemo } from 'react'
import { TitlePaneEntity, unfoldPane } from '../../../util'

export function useUnfold(rootPaneEntity: TitlePaneEntity) {
  const panes = useMemo(
    () =>
      unfoldPane(rootPaneEntity).filter((p) => !(p.children instanceof Array)),
    [rootPaneEntity]
  )
  return panes
}
