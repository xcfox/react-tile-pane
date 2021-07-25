import { useContext } from 'react'
import { TileLeavesContext } from '../..'
import { TileLeaf } from '../../../..'
import { PaneName } from '../../../../util'

export function useGetLeaf(): (name: PaneName) => TileLeaf | undefined {
  const leaves = useContext(TileLeavesContext)
  return (name) => {
    const leaf = leaves.find((l) => l.children.includes(name))
    return leaf
  }
}
