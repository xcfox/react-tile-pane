import { CSSProperties, createContext, ReactChild } from 'react'
import { Into } from '../../..'
import style from './style.module.css'

export type PreBoxTarget = 'leaf' | 'branch' | 'tag' | null

export type PreBoxConfig = {
  style?: ((into: Into, target: PreBoxTarget) => CSSProperties) | CSSProperties
  className?: ((into: Into, target: PreBoxTarget) => string) | string
  child?: ((into: Into, target: PreBoxTarget) => ReactChild) | ReactChild
  /** **millisecond**, Control PreBox calculation frequency */
  throttle?: number
}

export const defaultPreBox: PreBoxConfig = {
  throttle: 66,
  className: (_, target) => {
    switch (target) {
      case 'branch':
        return style.preBranch
      case null:
        return style.noPreBox
      default:
        return style.preBox
    }
  },
}

export const PreBoxConfigContext = createContext<PreBoxConfig>(defaultPreBox)
