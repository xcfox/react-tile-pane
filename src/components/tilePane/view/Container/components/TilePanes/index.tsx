import React, { memo, useMemo } from 'react'
import { usePanes } from './hook'
import { TilePane } from './components'

const TilePanesInner: React.FC = () => {
  const panes = usePanes()
  return useMemo(
    () => (
      <>
        {panes.map((pane) => (
          <TilePane pane={pane} key={pane.id} />
        ))}
      </>
    ),
    [panes]
  )
}

export const TilePanes = memo(TilePanesInner)
