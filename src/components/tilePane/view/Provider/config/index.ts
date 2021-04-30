import { createContext } from 'react'
import { TilePane } from '../../..'

export const TitlePanesContext = createContext<TilePane[]>([])
export * from './TabBar'
export * from './StretchBar'
export * from './PreBox'
export * from './Pane'
