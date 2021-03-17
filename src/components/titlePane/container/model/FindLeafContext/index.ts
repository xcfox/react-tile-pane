import { createContext } from 'react'
import { TileLeafID, TilePaneEntity } from '../../..'

export const FindLeafContext = createContext<
  (id: TileLeafID) => TilePaneEntity | undefined
>(() => void 0)
