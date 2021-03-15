import { createContext } from 'react'
import { StretchBarEntity, TilePaneEntity, TilePaneLeaf } from '../../..'

export const ContainerContext = createContext<{
  panes: TilePaneEntity[]
  stretchBars: StretchBarEntity[]
  paneLeaves: TilePaneLeaf[]
}>({ panes: [], stretchBars: [], paneLeaves: [] })
