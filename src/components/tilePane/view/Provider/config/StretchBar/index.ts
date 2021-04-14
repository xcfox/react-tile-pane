import { CSSProperties, createContext, ReactChild } from 'react'
export type StretchBarConfig = {
  style?: ((isRow: boolean) => CSSProperties) | CSSProperties
  className?: ((isRow: boolean) => string) | string
  child?: ((isRow: boolean) => ReactChild) | ReactChild
  /** **millisecond**, Controls the minimum Trigger Period of the Stretch Bar */
  throttle?: number
}

export const defaultStretchBar: StretchBarConfig = {
  className: (isRow) =>
    isRow ? 'react-tile-pane-rowBar' : 'react-tile-pane-colBar',
}

export const StretchBarConfigContext = createContext<StretchBarConfig>(
  defaultStretchBar
)
