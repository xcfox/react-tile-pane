import { createContext } from 'react'

export type StretchBarConfig = {
  thickness: number
}
export const defaultStretchBar: StretchBarConfig = {
  thickness: 10,
}
export const StretchBarConfigContext = createContext<StretchBarConfig>(
  defaultStretchBar
)
