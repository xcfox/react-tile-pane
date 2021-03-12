import React, { FC } from 'react'

import { RectReadOnly } from 'react-use-measure'
import { ContainerRectContext } from './ContainerRectContext'
import { UpdateManuallyContext } from './UpdateManuallyContext'

export interface ProviderProps {
  children?: React.ReactNode
  containerRect: RectReadOnly
  reCalcPane: () => void
}

export const Provider: FC<ProviderProps> = ({
  children,
  containerRect,
  reCalcPane,
}: ProviderProps) => (
  <ContainerRectContext.Provider value={containerRect}>
    <UpdateManuallyContext.Provider value={reCalcPane}>
      {children}
    </UpdateManuallyContext.Provider>
  </ContainerRectContext.Provider>
)

export { ContainerRectContext, UpdateManuallyContext }
