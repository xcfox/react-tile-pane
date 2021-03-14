import { createContext } from 'react'

export const DraggableTitlePositionContext = createContext<
  [
    [number, number] | undefined,
    React.Dispatch<React.SetStateAction<[number, number] | undefined>>
  ]
>([undefined, () => undefined])
