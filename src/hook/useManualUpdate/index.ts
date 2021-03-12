import { useCallback, useState } from 'react'

export function useManualUpdate(conditionOuter: unknown = true) {
  const [, setCounter] = useState(0)
  const update = useCallback(
    (condition: unknown = true) => {
      if (conditionOuter && condition) {
        setCounter((c) => c++)
      }
    },
    [conditionOuter]
  )
  return update
}
