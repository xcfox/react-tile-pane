import { CSSProperties } from 'react'
import { createContext } from 'react'
import style from './style.module.css'

export type StretchBarConfig = {
  /** **px** */
  thickness: number
  style?: ((isRow: boolean) => CSSProperties) | CSSProperties
  className?: ((isRow: boolean) => string) | string
  /** **millisecond**, Controls the minimum Trigger Period of the Stretch Bar */
  throttle?: number
}

export const defaultStretchBar: StretchBarConfig = {
  thickness: 7,
  className: (isRow) => (isRow ? style.rowBar : style.colBar),
}

export const StretchBarConfigContext = createContext<StretchBarConfig>(
  defaultStretchBar
)
