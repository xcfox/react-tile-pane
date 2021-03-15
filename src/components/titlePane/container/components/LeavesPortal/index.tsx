import React, { memo, useRef } from 'react'
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
  const sleepRef = useRef<HTMLDivElement>(null)
  const leafPortals = unfoldLeafRefs(paneLeafRefs, paneLeaves, sleepRef)
  return (
    <>
      {leafPortals.map((props, i) => (
        <LeafPortal key={props.id} {...props} />
      ))}
      <div ref={sleepRef} style={{ display: 'none' }} />
    </>
  )
}

export const LeavesPortal = memo(LeavesPortalInner)
