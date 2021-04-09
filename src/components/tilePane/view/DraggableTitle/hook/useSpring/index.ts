import { useEffect, useMemo, useState } from 'react'
import { Spring, SpringSystem } from 'rebound'

export const useSpring = (targetValue = 0, tension = 20, friction = 1) => {
  const [spring, setSpring] = useState<Spring | null>(null)
  const [value, setValue] = useState<number>(targetValue)

  // memoize listener to being able to unsubscribe later properly, otherwise
  // listener fn will be different on each re-render and wouldn't unsubscribe properly.
  const listener = useMemo(
    () => ({
      onSpringUpdate: (currentSpring: Spring) => {
        const newValue = currentSpring.getCurrentValue()
        setValue(newValue)
      },
    }),
    []
  )

  useEffect(() => {
    if (!spring) {
      const newSpring = new SpringSystem().createSpring(tension, friction)
      newSpring.setCurrentValue(targetValue)
      setSpring(newSpring)
      newSpring.addListener(listener)
    }

    return () => {
      if (spring) {
        spring.removeListener(listener)
        setSpring(null)
      }
    }
  }, [tension, friction, spring, targetValue, listener])

  useEffect(() => {
    if (spring) {
      spring.setEndValue(targetValue)
    }
  }, [spring, targetValue])

  return value
}
