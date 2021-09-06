import { CSSProperties, createContext, ReactChild } from 'react'
export type StretchBarConfig = {
  style?: ((isRow: boolean) => CSSProperties) | CSSProperties
  className?: ((isRow: boolean) => string) | string
  child?: ((isRow: boolean) => ReactChild) | ReactChild
  /** The StretchBar does not occupy the container area,
   *  but actually floats on top of the pane.
   *  position is used to specify whether the StretchBar floats in the middle of the adjacent pane,
   *  or is biased towards the previous, or the next one */
  position?: 'middle' | 'previous' | 'next'
  /** **millisecond**, Controls the minimum Trigger Period of the Stretch Bar */
  throttle?: number
}

export const defaultStretchBar: StretchBarConfig = {
  className: (isRow) => (isRow ? 'react-tile-pane-Bar' : 'react-tile-pane-Bar'),
  style: (isRow) => ({ cursor: isRow ? 'ew-resize' : 'ns-resize' }),
}

export const StretchBarConfigContext = createContext<StretchBarConfig>(
  defaultStretchBar
)
