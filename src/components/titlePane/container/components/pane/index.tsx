import React, { memo, useMemo } from 'react'

export interface PaneProps {}

const PaneInner: React.FC<PaneProps> = () => {
  return useMemo(() => <div>this is your Pane</div>, [])
}

export const Pane = memo(PaneInner)
