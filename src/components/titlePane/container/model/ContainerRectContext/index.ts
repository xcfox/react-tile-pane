import { createContext } from 'react'
import useMeasure, { RectReadOnly } from 'react-use-measure'

const defaultRect: RectReadOnly = {
  left: 0,
  top: 0,
  width: 0,
  height: 0,
  bottom: 0,
  right: 0,
  x: 0,
  y: 0,
}

export const ContainerRefContext = createContext<
  ReturnType<typeof useMeasure>[0]
>(() => null)

export const ContainerRectContext = createContext(defaultRect)
