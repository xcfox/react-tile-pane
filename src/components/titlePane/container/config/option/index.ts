import { createContext } from 'react'

export type TabsBarPosition = 'top' | 'bottom' | 'left' | 'right'
export interface Option {
  tabsBarPosition: TabsBarPosition
  stretchBarThickness: number
}

export const defaultOption: Option = {
  tabsBarPosition: 'top',
  stretchBarThickness: 8,
}

export const OptionContext = createContext<Option>(defaultOption)
