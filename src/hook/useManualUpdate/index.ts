import { useCallback, useState } from 'react'

export function useManualUpdate() {
  const [, setCounter] = useState(0)
  const manualUpdate = useCallback(() => {
    setCounter((c) => c++)
  }, [])
  return manualUpdate
}
