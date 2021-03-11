import { useRef, useMemo } from 'react'
import { TilePaneEntity, TitlePaneInterface, unfoldPane } from '../../util'

export function useInitContainer(rootPane: TitlePaneInterface) {
  const rootPaneEntityRef = useRef(new TilePaneEntity(rootPane))
  const rootPaneEntity = rootPaneEntityRef.current
  const { panes, stretchBars } = useMemo(() => unfoldPane(rootPaneEntity), [
    rootPaneEntity,
  ])
  return { panes, stretchBars, rootPaneEntityRef }
}
