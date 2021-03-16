import React, { memo, useContext, useEffect, useRef, useState } from 'react'
import { TileLeavesContext } from '../../config'
import { LeafPortal } from './components'

export interface LeavesPortalProps {}

const LeavesPortalInner: React.FC<LeavesPortalProps> = () => {
  const tileLeaves = useContext(TileLeavesContext)
  const [isInit, init] = useState(false)
  const sleepRef = useRef<HTMLDivElement>(null)
  const sleepDiv = sleepRef.current
  useEffect(() => {
    if (!isInit && !sleepDiv) {
      init(true)
    }
  }, [isInit, sleepDiv, tileLeaves])
  return (
    <>
      {sleepDiv &&
        tileLeaves.map((leaf, i) => (
          <LeafPortal sleepDiv={sleepDiv} key={leaf.id} leaf={leaf} />
        ))}
      <div id="sleepingLeaves" ref={sleepRef} style={{ display: 'none' }} />
    </>
  )
}

export const LeavesPortal = memo(LeavesPortalInner)
