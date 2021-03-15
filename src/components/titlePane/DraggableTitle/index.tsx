import React, { memo, useCallback, useContext, useMemo, useRef } from 'react'
import { sleepingLeaves } from '../container/components/LeavesPortal/util'
import { ContainerContext, UpdateManuallyContext } from '../container/model'
import { PaneWithPreBox, TileNodeID } from '../util'
import { PreBox } from './components'
import { useDragAndPosition } from './hook'

export interface DraggableTitleProps {
  id: TileNodeID
  children?: React.ReactNode
}

const DraggableTitleInner: React.FC<DraggableTitleProps> = ({
  id,
  children,
}) => {
  const paneWithPreBoxRef = useRef<PaneWithPreBox>()
  const { position, bind } = useDragAndPosition(paneWithPreBoxRef)

  const { paneLeaves } = useContext(ContainerContext)
  const pane = useMemo(() => paneLeaves.find((p) => p.children.includes(id)), [
    id,
    paneLeaves,
  ])

  const tabIndex = useMemo(
    () => (pane?.children ?? []).findIndex((it) => it === id),
    [id, pane?.children]
  )
  const calcLayout = useContext(UpdateManuallyContext)

  const sleep = useCallback(() => {
    if (!pane || tabIndex < 0) return
    pane.removeTab(tabIndex)
    sleepingLeaves.push(id)
    calcLayout()
  }, [calcLayout, id, pane, tabIndex])

  const style: React.CSSProperties = useMemo(
    () =>
      position
        ? {
            position: 'fixed',
            top: position[1],
            left: position[0],
            transform: 'translate(-50%,-50%)',
            zIndex: 1,
          }
        : {},
    [position]
  )
  return useMemo(
    () => (
      <>
        {position && <PreBox {...{ paneWithPreBoxRef, position }} />}
        <p onClick={sleep}>点击睡眠</p>
        <div {...{ ...bind(), style }} style={style}>
          {children}
        </div>
      </>
    ),
    [bind, children, position, sleep, style]
  )
}

export const DraggableTitle = memo(DraggableTitleInner)
