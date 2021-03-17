import { useCallback, useRef, useState } from 'react'
import {
  isTileNodeIDs,
  TileLeafID,
  TilePaneEntity,
  TitlePaneInterface,
  unfoldPane,
} from '../../util'

export function useContainer(rootPane: TitlePaneInterface) {
  const rootPaneEntityRef = useRef(new TilePaneEntity(rootPane))
  const [{ panes, stretchBars }, setPanes] = useState(
    unfoldPane(rootPaneEntityRef.current)
  )

  const reCalcLayout = useCallback(() => {
    setPanes(unfoldPane(rootPaneEntityRef.current))
  }, [])

  const findLeaf = useCallback(
    (id: TileLeafID) => {
      return panes.find((p) => {
        if (!isTileNodeIDs(p.children)) return false
        return p.children.includes(id)
      })
    },
    [panes]
  )

  return {
    panes,
    stretchBars,
    rootPaneEntityRef,
    reCalcLayout,
    findLeaf,
  }
}
