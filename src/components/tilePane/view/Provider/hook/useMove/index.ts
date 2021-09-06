import { useContext, useMemo } from 'react'
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

export type Vector2 = [number, number]

/** Accepts an array in [x, y] format, with each number between 0 and 1, the pane will be moved to that position in the container.
 *  when null is passed in, the pane will be closed.
 * @example
 * move(names.apple, null)  // close the `apple` pane
 * move(names.apple, [0.99, 0.01])  // move `apple` pane to upper right corner
 */
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
