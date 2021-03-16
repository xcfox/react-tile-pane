import { createContext } from 'react'
import { TileLeafID } from '../../..'

export type PortalPromise = {
  id: TileLeafID
  resolve: (value: TileLeafID | PromiseLike<TileLeafID>) => void
}

export const PortalPromiseContext = createContext<
  [
    PortalPromise | undefined,
    React.Dispatch<React.SetStateAction<PortalPromise | undefined>>
  ]
>([undefined, () => undefined])
