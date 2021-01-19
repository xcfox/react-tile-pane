import React, { memo, useMemo } from 'react'

export interface PaneContainerProps {}

const PaneContainerInner: React.FC<PaneContainerProps> = () => {
  return useMemo(() => <div>this is your PaneContainer</div>, [])
}

export const PaneContainer = memo(PaneContainerInner)
