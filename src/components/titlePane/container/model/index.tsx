import React, { FC } from 'react'

import { RectReadOnly } from 'react-use-measure'
import { ContainerRectContext } from './ContainerRectContext'
import { UpdateManuallyContext } from './UpdateManuallyContext'
import { TileNodeListContext } from './TileNodeListContext'
import { TileNode } from '../..'

export interface ProviderProps {
  children?: React.ReactNode
  containerRect: RectReadOnly
  reCalcPane: () => void
  tileNodeList: TileNode[]
}

export const Provider: FC<ProviderProps> = ({
  children,
  containerRect,
  reCalcPane,
  tileNodeList,
}: ProviderProps) => (
  <ContainerRectContext.Provider value={containerRect}>
    <UpdateManuallyContext.Provider value={reCalcPane}>
      <TileNodeListContext.Provider value={tileNodeList}>
        {children}
      </TileNodeListContext.Provider>
    </UpdateManuallyContext.Provider>
  </ContainerRectContext.Provider>
)

export { ContainerRectContext, UpdateManuallyContext, TileNodeListContext }
