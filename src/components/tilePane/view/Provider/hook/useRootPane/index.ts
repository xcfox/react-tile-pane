import { useContext } from 'react'
import { TileBranchesContext } from '../..'

export function useRootPane() {
  const nodes = useContext(TileBranchesContext)
  return nodes[0].dehydrate()
}
