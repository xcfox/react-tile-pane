import React, { memo, useContext, useMemo } from 'react'
import { createPortal } from 'react-dom'
import { TileNodeID } from '../../../../..'
import { TileLeavesContext } from '../../../../config'

export interface LeafPortalProps {
  leafDiv: HTMLDivElement
  id: TileNodeID
}

const LeafPortalInner: React.FC<LeafPortalProps> = ({ leafDiv, id }) => {
  const tileLeaves = useContext(TileLeavesContext)
  const node = useMemo(() => {
    const leaf = tileLeaves.find((l) => l.id === id)
    return leaf?.node
  }, [id, tileLeaves])
  const child = useMemo(() => node, [node])
  return createPortal(child, leafDiv, String(id))
}

export const LeafPortal = memo(LeafPortalInner)
