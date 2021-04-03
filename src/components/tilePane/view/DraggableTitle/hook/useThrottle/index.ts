/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useRef } from 'react'

export function useThrottleFn<Fn extends (...args: any[]) => any>(
  fn: Fn,
  ms?: number
): Fn {
  const result = useRef<any>()
  const timerRef = useRef<number>()

  const throttledFn = useCallback(
    (...arg) => {
      if (!timerRef.current) {
        timerRef.current = window.setTimeout(() => {
          clearTimeout(timerRef.current)
          timerRef.current = undefined
        }, ms)
        result.current = fn(...arg)
      }
      return result.current
    },
    [fn, ms]
  )

  return ms ? (throttledFn as Fn) : fn
}
