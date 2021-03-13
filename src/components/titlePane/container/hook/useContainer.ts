import { useCallback, useRef, useState } from 'react'
import { TilePaneEntity, TitlePaneInterface, unfoldPane } from '../../util'

export function useContainer(rootPane: TitlePaneInterface) {
  const rootPaneEntityRef = useRef(new TilePaneEntity(rootPane))
  const [{ panes, stretchBars }, setPanes] = useState(
    unfoldPane(rootPaneEntityRef.current)
  )

  const reCalcPane = useCallback(() => {
    setPanes(unfoldPane(rootPaneEntityRef.current))
  }, [])

  console.log(panes)

  return { panes, stretchBars, rootPaneEntityRef, reCalcPane }
}
