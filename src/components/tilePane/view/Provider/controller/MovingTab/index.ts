import { initRootNode, TileStore } from '../..'
import {
  MovingTab,
  PaneName,
  TileBranch,
  TileLeaf,
  removeInArray,
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

  const nodes = initRootNode(rootNode.dehydrate())

  return {
    movingTabs: newMovingTabs,
    ...nodes,
  }
}

export function stopMovingTab(
  { movingTabs, ...rest }: TileStore,
  tabToStopMoving: PaneName
): TileStore {
  const newMovingTabs = movingTabs.slice()
  const index = newMovingTabs.findIndex((it) => (it.name = tabToStopMoving))
  newMovingTabs.splice(index, 1)
  return { movingTabs: newMovingTabs, ...rest }
}

function removeLeaf(branches: TileBranch[], leaf: TileLeaf) {
  const parent = branches.find((it) => it === leaf.parent)
  if (parent) {
    const arid = parent.dehydrate()
    const newChildren = removeInArray(arid.children, (it) => it.id === leaf.id)
    parent.setChildren(newChildren)
  }
}
