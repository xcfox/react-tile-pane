import { createContext, CSSProperties } from 'react'

export interface PaneConfig {
  style?: CSSProperties
  className?: string
}

export const defaultPane: PaneConfig = {}

export const PaneContext = createContext<PaneConfig>(defaultPane)
