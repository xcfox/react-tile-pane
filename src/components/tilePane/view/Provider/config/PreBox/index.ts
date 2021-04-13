import { CSSProperties, createContext, ReactChild } from 'react'
import { PaneWithPreBox } from '../../..'
import style from './style.module.css'

export type PreBoxTarget = 'leaf' | 'branch' | 'tab' | null

export type PreBoxConfig = {
  style?: ((paneWithPreBox: PaneWithPreBox) => CSSProperties) | CSSProperties
  className?: ((paneWithPreBox: PaneWithPreBox) => string) | string
  child?: ((paneWithPreBox: PaneWithPreBox) => ReactChild) | ReactChild
  /** **millisecond**, Control PreBox calculation frequency */
  throttle?: number
}

export const defaultPreBox: PreBoxConfig = {
  throttle: 66,
  className: ({ branch, leaf, tab }) => {
    if (branch) return style.preBranch
    if (leaf) return style.preBox
    if (tab) return style.preBox
    return style.noPreBox
  },
}

export const PreBoxConfigContext = createContext<PreBoxConfig>(defaultPreBox)
