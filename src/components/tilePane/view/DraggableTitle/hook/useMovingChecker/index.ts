import { useCallback, useContext } from 'react'
import { MovingTabsContext } from '../../..'
import { PaneName } from '../../../..'

export function useMovingChecker() {
  const tabs = useContext(MovingTabsContext)
  const isMoving = useCallback(
    (name: PaneName) => tabs.map((tab) => tab.name).includes(name),
    [tabs]
  )
  return isMoving
}
