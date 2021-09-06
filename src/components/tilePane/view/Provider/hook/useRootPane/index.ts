import { useContext } from 'react'
import { TileBranchesContext } from '../..'

export function useGetRootNode() {
  const nodes = useContext(TileBranchesContext)
  return () => nodes[0].dehydrate()
}
