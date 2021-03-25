import { TileStore } from '../..'
import {
  MovingTab,
  removeInArray,
  TileBranch,
  TileLeaf,
  unfold,
} from '../../../..'

export function startMovingTab(
  { movingTabs, leaves, branches, rootNode }: TileStore,
  tabToStopMoving: MovingTab
): TileStore {
  const newMovingTabs = movingTabs.slice()
  const { name } = tabToStopMoving
  const existedTab = newMovingTabs.find((it) => (it.name = name))
  if (!existedTab) {
    newMovingTabs.push(tabToStopMoving)
  }

  const leaf = leaves.find((l) => l.children.includes(name))
  if (leaf) {
    const newChildren = removeInArray(leaf.children, name)
    leaf.onTab = 0
    leaf.setChildren(newChildren)
    if (newChildren.length === 0) {
      removeNode(branches, leaf)
    }
  }

  const nodes = unfold(rootNode)
  return {
    movingTabs: newMovingTabs,
    rootNode,
    ...nodes,
  }
}

function removeNode(branches: TileBranch[], node: TileLeaf | TileBranch) {
  const parent = branches.find((it) => it === node.parent)
  if (parent) {
    const newChildren = removeInArray(
      parent.children,
      (it) => it.id === node.id
    )
    if (newChildren.length === 0) {
      removeNode(branches, parent)
    } else {
      parent.setChildren(newChildren)
    }
  }
}
