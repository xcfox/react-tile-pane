import { createTileBranch, TileBranchSubstance, unfold } from '../../..'

export function initRootNode(rootNodeSub: TileBranchSubstance) {
  const rootNode = createTileBranch(rootNodeSub)
  const nodes = unfold(rootNode)
  return { rootNode, ...nodes }
}
