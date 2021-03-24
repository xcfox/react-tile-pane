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
    leaf.setChildren(newChildren)
    if (newChildren.length === 0) {
      removeLeaf(branches, leaf)
    }
  }

  const nodes = unfold(rootNode)

  return {
    movingTabs: newMovingTabs,
    rootNode,
    ...nodes,
  }
}

function removeLeaf(branches: TileBranch[], leaf: TileLeaf) {
  const parent = branches.find((it) => it === leaf.parent)
  if (parent) {
    const newChildren = removeInArray(
      parent.children,
      (it) => it.id === leaf.id
    )
    parent.setChildren(newChildren)
  }
}
