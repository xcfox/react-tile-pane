import React, { memo, useCallback, useContext, useMemo, useRef } from 'react'
import {
  ContainerContext,
  TileLeavesContext,
  UpdateManuallyContext,
  PortalPromiseContext,
} from '../container/model'
import { PaneWithPreBox, TileLeafID } from '../util'
import { PreBox } from './components'
import { useDragAndPosition } from './hook'

export interface DraggableTitleProps {
  id: TileLeafID
  children?: React.ReactNode
}

const DraggableTitleInner: React.FC<DraggableTitleProps> = ({
  id,
  children,
}) => {
  const paneWithPreBoxRef = useRef<PaneWithPreBox>()

  const { paneLeaves } = useContext(ContainerContext)
  const pane = useMemo(() => paneLeaves.find((p) => p.children.includes(id)), [
    id,
    paneLeaves,
  ])
  const { position, bind } = useDragAndPosition(paneWithPreBoxRef, pane)

  const tabIndex = useMemo(
    () => (pane?.children ?? []).findIndex((it) => it === id),
    [id, pane?.children]
  )
  const calcLayout = useContext(UpdateManuallyContext)
  const tileLeaves = useContext(TileLeavesContext)
  const leaf = useMemo(() => tileLeaves.find((l) => l.id === id), [
    id,
    tileLeaves,
  ])
  const [, setPortalPromise] = useContext(PortalPromiseContext)

  const sleep = useCallback(async () => {
    if (!pane || !leaf || tabIndex < 0) return
    pane.removeTab(tabIndex)
    leaf.isSleeping = true
    const promise = new Promise<TileLeafID>((resolve) => {
      setPortalPromise({ id, resolve })
    })
    const resolveId = await promise
    if (resolveId === id) {
      calcLayout()
    }
  }, [calcLayout, id, leaf, pane, setPortalPromise, tabIndex])

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
