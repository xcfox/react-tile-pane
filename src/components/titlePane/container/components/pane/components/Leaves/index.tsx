import React, { memo, useMemo } from 'react'
import { TileLeafID } from '../../../../..'

export interface LeafProps {
  leaf: { id: TileLeafID; node: React.ReactChild }
  currentIndex: number
  index: number
}

const LeafInner: React.FC<LeafProps> = ({ leaf, currentIndex, index }) => {
  const isShowing = currentIndex === index
  return useMemo(
    () => (
      <div
        style={{
          flexGrow: isShowing ? 1 : 0,
          display: isShowing ? undefined : 'none',
        }}
      >
        {leaf.node}
      </div>
    ),
    [isShowing, leaf.node]
  )
}

export const Leaf = memo(LeafInner)
