import { TileStore } from '../..'
import { Into, PaneWithPreBox } from '../../..'
import {
  PaneName,
  removeInArray,
  unfold,
  isTileLeaf,
  TileBranch,
  TileLeaf,
  TileLeafSubstance,
  TileBranchSubstance,
  replaceInArray,
} from '../../../..'

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
  const { targetNode: node, into } = preBox
  const { leaves, branches } = nodes
  const isNext = ['right', 'bottom'].includes(into)
  const isBrother = isSegment(node, into)
  const isRow = ['right', 'left'].includes(into)

  if (isTileLeaf(node)) {
    const leaf = leaves.find((it) => it === node)
    if (leaf) {
      if (into === 'center') {
        const newChildren = leaf.children.slice()
        newChildren.push(pane)
        leaf.setChildren(newChildren)
        leaf.onTab = leaf.children.length - 1
      } else {
        isBrother
          ? segment(node, pane, isNext)
          : fission(node, pane, isNext, isRow)
      }
    }
  } else {
    const branch = branches.find((it) => it === node)
    if (branch) {
      fission(node, pane, isNext, isRow)
    }
  }
}

/** 分割 ——插入同级节点 */
function segment(node: TileBranch | TileLeaf, pane: PaneName, isNext: boolean) {
  const { parent } = node
  if (!parent) return
  const grow = node.grow / 2
  const leaf: TileLeafSubstance = { grow, children: [pane] }
  node.grow = grow
  const indexInParent = parent.children.findIndex((it) => it === node)
  const index = isNext ? indexInParent + 1 : indexInParent
  const newNodes: (
    | TileBranchSubstance
    | TileLeafSubstance
  )[] = parent.children.slice()
  newNodes.splice(index, 0, leaf)
  parent.setChildren(newNodes)
}

/** 分裂 ——插入子级节点*/
function fission(
  node: TileBranch | TileLeaf,
  pane: PaneName,
  isNext: boolean,
  isRow: boolean
) {
  const { parent, grow } = node
  if (!parent) {
    const newLeaf: TileLeafSubstance = { grow, children: [pane] }
    const oldLeaf: TileBranchSubstance | TileLeafSubstance = isTileLeaf(node)
      ? node.dehydrate()
      : node.dehydrate()
    if (!isTileLeaf(node)) {
      node.isRow = isRow
      node.setChildren(isNext ? [oldLeaf, newLeaf] : [newLeaf, oldLeaf])
    }
    return
  }
  const newLeaf: TileLeafSubstance = { grow, children: [pane] }
  const branch: TileBranchSubstance = {
    grow,
    isRow,
    children: isNext ? [node, newLeaf] : [newLeaf, node],
  }
  const newNodes = replaceInArray<TileBranchSubstance | TileLeafSubstance>(
    parent?.children,
    node,
    branch
  )
  parent.setChildren(newNodes)
}

function isSegment(node: TileBranch | TileLeaf, into: Into): boolean {
  const isRow = node.parent?.isRow
  const segmentInto: Into[] = isRow ? ['left', 'right'] : ['top', 'bottom']
  return segmentInto.includes(into)
}
