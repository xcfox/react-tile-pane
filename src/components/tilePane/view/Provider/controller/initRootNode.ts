import { createTileBranch, TileBranchSubstance, unfold } from '../../..'
import { TileStore } from '..'

export function initRootNode(rootNodeSub: TileBranchSubstance): TileStore {
  const rootNode = createTileBranch(rootNodeSub)
  const nodes = unfold(rootNode)
  return { rootNode, ...nodes, movingTabs: [] }
}
