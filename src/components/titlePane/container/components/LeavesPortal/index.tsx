import React, { memo } from 'react'
import { LeafRefs } from '..'
import { TilePaneLeaf } from '../../..'
import { LeafPortal } from './components'
import { unfoldLeafRefs } from './util'

export interface LeavesPortalProps {
  paneLeafRefs: LeafRefs[]
  paneLeaves: TilePaneLeaf[]
}

const LeavesPortalInner: React.FC<LeavesPortalProps> = ({
  paneLeafRefs,
  paneLeaves,
}: LeavesPortalProps) => {
  const leafPortals = unfoldLeafRefs(paneLeafRefs, paneLeaves)
  return (
    <>
      {leafPortals.map((props, i) => (
        <LeafPortal key={i} {...props} />
      ))}
    </>
  )
}

export const LeavesPortal = memo(LeavesPortalInner)
