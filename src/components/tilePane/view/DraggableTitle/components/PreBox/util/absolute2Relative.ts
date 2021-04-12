import { Vector2 } from 'react-use-gesture/dist/types'
import { RectReadOnly } from 'react-use-measure'

export function absolute2Relative(
  containerRect: RectReadOnly,
  x: number,
  y: number
) {
  return [
    (x - containerRect.left) / containerRect.width,
    (y - containerRect.top) / containerRect.height,
  ] as Vector2
}
