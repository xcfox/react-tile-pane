import React, { memo, useMemo } from 'react'
import { TileLeafID } from '../../../../..'

export interface LeafProps {
  leaf: { id: TileLeafID; node: React.ReactChild }
  currentIndex: number
  index: number
}

const LeafInner: React.FC<LeafProps> = ({ leaf, currentIndex, index }) => {
  return useMemo(
    () => (
      <div
        style={{
          flexGrow: currentIndex === index ? 1 : 0,
          display: currentIndex === index ? undefined : 'none',
        }}
      >
        {leaf.node}
      </div>
    ),
    [currentIndex, index, leaf.node]
  )
}

export const Leaf = memo(LeafInner)
