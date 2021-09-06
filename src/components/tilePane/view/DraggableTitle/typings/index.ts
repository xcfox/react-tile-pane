import { TileBranch, TileLeaf } from '../../..'

/**Where the dragged pane will be placed in the current pane?*/
export type Into = 'top' | 'bottom' | 'left' | 'right' | 'center'

/** How PaneWithPreBox look like? */
export type PaneWithPreBox = {
  /** How PaneWithPreBox look like when in branch? */
  branch?: {
    target: TileBranch
    /**Where the dragged pane will be placed in the target branch?*/
    into: Into
  }
  /** How PaneWithPreBox look like when in leaf? */
  leaf?: {
    target: TileLeaf
    /**Where the dragged pane will be placed in the target leaf?*/
    into: Into
  }
  /** How PaneWithPreBox look like when in TabsBar? */
  tab?: {
    target: TileLeaf
    /**Where the dragged pane will be placed in the target leaf?*/
    into: number
    hasNext: boolean
  }
}
