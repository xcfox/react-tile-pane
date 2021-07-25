import { useContext, useMemo } from 'react'
import { Vector2 } from '..'
import {
  TileBranchesContext,
  TileLeavesContext,
  TabsBarContext,
  TitleRectsContext,
  TileDispatchContext,
} from '../..'
import { PaneName } from '../../../../util'
import {
  calcLeafWithTitleRect,
  calcPreBox,
} from '../../../DraggableTitle/components/PreBox/util'

export type MovePane = (name: PaneName, position?: Vector2 | null) => void

export function useMovePane(): MovePane {
  const dispatch = useContext(TileDispatchContext)
  const branches = useContext(TileBranchesContext)
  const leaves = useContext(TileLeavesContext)
  const { preBox: preBoxInTabBar } = useContext(TabsBarContext)
  const titleRects = useContext(TitleRectsContext)

  const leafWithTitleRects = useMemo(
    () => calcLeafWithTitleRect(titleRects, leaves),
    [leaves, titleRects]
  )

  return (name, position) => {
    if (!position) {
      dispatch({ leafToCloseTab: { name } })
      return
    }

    const paneWithPreBox = calcPreBox(
      branches,
      leaves,
      leafWithTitleRects,
      position,
      preBoxInTabBar
    )
    dispatch({ tabToStartMoving: { name } })
    dispatch({ tabToStopMoving: { pane: name, preBox: paneWithPreBox } })
  }
}
