import { useCallback, useEffect, useState } from 'react'
import { Vector2 } from 'react-use-gesture/dist/types'

export function useMouse(enable = true) {
  const [position, setPosition] = useState<Vector2>([0, 0])

  const mousemove = useCallback(
    (e: MouseEvent) => {
      enable && setPosition([e.clientX, e.clientY])
    },
    [enable]
  )

  useEffect(() => {
    window.addEventListener('mousemove', mousemove)
    return () => {
      window.removeEventListener('mousemove', mousemove)
    }
  }, [mousemove])

  return position
}
