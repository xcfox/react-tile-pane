import { useCallback, useRef, useState } from 'react'
import { TilePaneEntity, TitlePaneInterface, unfoldPane } from '../../util'

export function useInitContainer(rootPane: TitlePaneInterface) {
  const rootPaneEntityRef = useRef(new TilePaneEntity(rootPane))
  const [{ panes, stretchBars }, setPanes] = useState(
    unfoldPane(rootPaneEntityRef.current)
  )

  const reCalcPane = useCallback(() => {
    setPanes(unfoldPane(rootPaneEntityRef.current))
  }, [])

  return { panes, stretchBars, rootPaneEntityRef, reCalcPane }
}
