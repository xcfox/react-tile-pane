import { CSSProperties, createContext, ReactChild } from 'react'
import { PaneWithPreBox } from '../../..'

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
    if (branch) return 'react-tile-pane-preBranch'
    if (leaf) return 'react-tile-pane-preBox'
    if (tab) return 'react-tile-pane-preBoxInTab'
    return 'react-tile-pane-noPreBox'
  },
}

export const PreBoxConfigContext = createContext<PreBoxConfig>(defaultPreBox)
