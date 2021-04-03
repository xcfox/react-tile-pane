import { CSSProperties, createContext } from 'react'
import { Into } from '../../..'
import style from './style.module.css'

export type PreBoxConfig = {
  style?: ((into: Into, isLeaf: boolean) => CSSProperties) | CSSProperties
  className?: ((into: Into, isLeaf: boolean) => string) | string
  /** **millisecond**, Control PreBox calculation frequency */
  throttle?: number
}

export const defaultPreBox: PreBoxConfig = {
  throttle: 66,
  className: (_, isLeaf) => (isLeaf ? style.preBox : style.preBranch),
}

export const PreBoxConfigContext = createContext<PreBoxConfig>(defaultPreBox)
