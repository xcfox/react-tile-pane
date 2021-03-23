import React, { memo, useContext, useMemo } from 'react'
import { StretchBarsContext } from '../../..'
import { StretchBar } from './StretchBar'

const StretchBarsInner: React.FC = () => {
  const bars = useContext(StretchBarsContext)
  return useMemo(
    () => (
      <>
        {bars.map((bar) => (
          <StretchBar bar={bar} key={bar.nextPane.id} />
        ))}
      </>
    ),
    [bars]
  )
}

export const StretchBars = memo(StretchBarsInner)
