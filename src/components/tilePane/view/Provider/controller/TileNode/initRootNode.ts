import { createTileBranch, TileBranchSubstance, unfold } from '../../../..'
import { TileNodeStore } from '../..'

export function initRootNode(rootNodeSub: TileBranchSubstance): TileNodeStore {
  const rootNode = createTileBranch(rootNodeSub)
  const nodes = unfold(rootNode)
  return { rootNode, ...nodes }
}
