import { createContext } from 'react'
import { TilePane } from '../../..'

export const TitlePanesContext = createContext<TilePane[]>([])
export * from './TabBar'
