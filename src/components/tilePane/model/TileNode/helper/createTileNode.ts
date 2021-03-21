import { TileBranch, TileBranchSubstance } from '..'

export function createTileBranch(sub: TileBranchSubstance) {
  const { isRow, children, id, grow } = sub
  return new TileBranch(isRow, children, id, null, grow, undefined)
}
