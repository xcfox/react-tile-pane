import React, { memo, useMemo } from 'react'
import { StretchBarEntity } from '../../..'
import { calcBarStyles } from './util'

export interface StretchBarProps {
  bar: StretchBarEntity
}

const StretchBarInner: React.FC<StretchBarProps> = ({ bar }) => {
  return useMemo(
    () => (
      <div
        style={{
          position: 'absolute',
          background: '#81ec8166',
          ...calcBarStyles(bar),
        }}
      />
    ),
    [bar]
  )
}

export const StretchBar = memo(StretchBarInner)
