import React, { memo, useContext, useEffect, useMemo } from 'react'
import { TileLeafID } from '../../../../..'
import { OptionContext, TileLeavesContext } from '../../../../config'

export interface LeafProps {
  leaf: { id: TileLeafID; node: React.ReactChild }
  currentIndex: number
  index: number
}

const LeafInner: React.FC<LeafProps> = ({ leaf, currentIndex, index }) => {
  const { usePortal } = useContext(OptionContext)
  const tileLeaves = useContext(TileLeavesContext)
  const ref = React.useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (usePortal) {
      const leafEntity = tileLeaves.find((l) => l.id === leaf.id)
      if (leafEntity) leafEntity.ref = ref
    }
  }, [leaf.id, tileLeaves, usePortal])
  return useMemo(
    () => (
      <div
        ref={ref}
        style={{
          flexGrow: currentIndex === index ? 1 : 0,
          display: currentIndex === index ? undefined : 'none',
        }}
      >
        {!usePortal && leaf.node}
      </div>
    ),
    [currentIndex, index, leaf.node, usePortal]
  )
}

export const Leaf = memo(LeafInner)
