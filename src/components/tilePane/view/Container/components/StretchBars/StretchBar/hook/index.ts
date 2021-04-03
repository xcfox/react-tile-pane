import { useCallback, useContext, useRef } from 'react'
import {
  StretchBarConfigContext,
  StretchBarEntity,
  TileDispatchContext,
} from '../../../../../..'

export function useThrottleMove(bar: StretchBarEntity) {
  const { throttle } = useContext(StretchBarConfigContext)
  const timerRef = useRef<number>()
  const accumulation = useRef<number>(0)

  const dispatch = useContext(TileDispatchContext)

  const move = useCallback(
    (distance: number) => {
      if (!timerRef.current) {
        timerRef.current = window.setTimeout(() => {
          clearTimeout(timerRef.current)
          timerRef.current = undefined
        }, throttle)
        dispatch({
          barToMove: {
            bar,
            distance: accumulation.current ?? distance,
          },
        })
        accumulation.current = distance
      } else {
        accumulation.current += distance
      }
    },
    [bar, dispatch, throttle]
  )
  return move
}
