import { createContext } from 'react'

export type TabsBarPosition = 'top' | 'bottom' | 'left' | 'right'
export interface Option {
  tabsBarPosition: TabsBarPosition
  stretchBarThickness: number
  usePortal: boolean
}

export const defaultOption: Option = {
  tabsBarPosition: 'top',
  stretchBarThickness: 8,
  usePortal: true,
}

export const OptionContext = createContext<Option>(defaultOption)
