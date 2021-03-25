import { TileStore } from '../..'
import { PaneWithPreBox } from '../../..'
import { PaneName, removeInArray, unfold, isTileLeaf } from '../../../..'

export type TabToStopMoving = {
  pane: PaneName
  preBox?: PaneWithPreBox
}

export function stopMovingTab(
  { movingTabs, ...rest }: TileStore,
  { pane, preBox }: TabToStopMoving
): TileStore {
  const newMovingTabs = removeInArray(movingTabs, (it) => (it.name = pane))
  if (preBox) {
    const { rootNode } = rest
    insertPane(pane, preBox, rest)
    const nodes = unfold(rootNode)
    return { movingTabs: newMovingTabs, rootNode, ...nodes }
  } else return { movingTabs: newMovingTabs, ...rest }
}

function insertPane(
  pane: PaneName,
  preBox: PaneWithPreBox,
  nodes: Pick<TileStore, 'branches' | 'leaves'>
) {
  const { targetNode, into } = preBox
  const { leaves, branches } = nodes
  if (isTileLeaf(targetNode)) {
    const leaf = leaves.find((it) => it === targetNode)
    if (leaf) {
      if (into === 'center') {
        const newChildren = leaf.children.slice()
        newChildren.push(pane)
        leaf.setChildren(newChildren)
        leaf.onTab = leaf.children.length - 1
      }
    }
  } else {
    const branch = branches.find((it) => it === targetNode)
    if (branch) {
      //
    }
  }
}
