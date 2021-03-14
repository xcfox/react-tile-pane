import { createContext } from 'react'
import { StretchBarEntity, TilePaneEntity } from '../../..'

export const ContainerContext = createContext<{
  panes: TilePaneEntity[]
  stretchBars: StretchBarEntity[]
}>({ panes: [], stretchBars: [] })
