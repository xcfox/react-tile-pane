import { CSSProperties, createContext, ReactChild } from 'react'
import style from '../style.module.css'

export type StretchBarConfig = {
  style?: ((isRow: boolean) => CSSProperties) | CSSProperties
  className?: ((isRow: boolean) => string) | string
  child?: ((isRow: boolean) => ReactChild) | ReactChild
  /** **millisecond**, Controls the minimum Trigger Period of the Stretch Bar */
  throttle?: number
}

export const defaultStretchBar: StretchBarConfig = {
  className: (isRow) => (isRow ? style.rowBar : style.colBar),
}

export const StretchBarConfigContext = createContext<StretchBarConfig>(
  defaultStretchBar
)
