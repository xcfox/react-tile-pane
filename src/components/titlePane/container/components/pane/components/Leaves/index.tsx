import React, { memo, useContext, useEffect, useMemo } from 'react'
import { LeafRefs } from '../..'
import { TileNodeID } from '../../../../..'
import { OptionContext } from '../../../../config'

export interface LeafProps {
  leaf: { id: TileNodeID; node: React.ReactChild }
  currentIndex: number
  index: number
  leafIndex: number
  setPaneLeafRefs: React.Dispatch<React.SetStateAction<LeafRefs[]>>
}

const LeafInner: React.FC<LeafProps> = ({
  leaf,
  currentIndex,
  index,
  setPaneLeafRefs,
  leafIndex,
}) => {
  const { usePortal } = useContext(OptionContext)
  const ref = React.useRef<HTMLDivElement>(null)
  useEffect(() => {
    usePortal &&
      setPaneLeafRefs((leafRefs) => {
        const newLeafRefs = leafRefs.slice()
        newLeafRefs[leafIndex][leaf.id] = ref
        return newLeafRefs
      })
  }, [leaf.id, leafIndex, setPaneLeafRefs, usePortal])
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
