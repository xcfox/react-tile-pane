import React, { memo, useMemo } from 'react'

export interface StretchBarProps {}

const StretchBarInner: React.FC<StretchBarProps> = () => {
  return useMemo(() => <div>this is your StretchBar</div>, [])
}

export const StretchBar = memo(StretchBarInner)
