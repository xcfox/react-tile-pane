import { useCallback, useContext } from 'react'
import { TileBranchSubstance, TileDispatchContext } from '../../../..'

export function useReset(): (rootNode: TileBranchSubstance) => void {
  const dispatch = useContext(TileDispatchContext)
  return useCallback(
    (reset: TileBranchSubstance) => {
      dispatch({ reset })
    },
    [dispatch]
  )
}
