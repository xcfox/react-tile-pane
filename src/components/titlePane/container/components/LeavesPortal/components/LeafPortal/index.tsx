import React, { memo, useContext, useEffect, useMemo } from 'react'
import { createPortal } from 'react-dom'
import { TileLeafEntity } from '../../../../..'
import { PortalPromiseContext } from '../../../../model'

export interface LeafPortalProps {
  sleepDiv: HTMLDivElement
  leaf: TileLeafEntity
}

const LeafPortalInner: React.FC<LeafPortalProps> = ({ sleepDiv, leaf }) => {
  const [portalPromise] = useContext(PortalPromiseContext)
  const { node, id, isSleeping, ref } = leaf
  const child = useMemo(() => node, [node])
  useEffect(() => {
    if (portalPromise) {
      const { resolve, id } = portalPromise
      if (id === leaf.id) {
        resolve(id)
      }
    }
  }, [leaf.id, portalPromise])
  const div = isSleeping ? sleepDiv : ref?.current
  return div ? createPortal(child, div, String(id)) : null
}

export const LeafPortal = memo(LeafPortalInner)
