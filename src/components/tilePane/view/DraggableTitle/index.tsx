import React, { memo, useContext, useMemo, useRef } from 'react'
import { TileLeavesContext } from '..'
import { PaneName } from '../..'
import { PreBox } from './components'
import { useDragAndPosition } from './hook'
import { PaneWithPreBox } from './typings'

export interface DraggableTitleProps {
  name: PaneName
  children?: React.ReactNode
}

const DraggableTitleInner: React.FC<DraggableTitleProps> = ({
  name,
  children,
}) => {
  const paneWithPreBoxRef = useRef<PaneWithPreBox>()

  const leaves = useContext(TileLeavesContext)
  const pane = useMemo(() => leaves.find((p) => p.children.includes(name)), [
    name,
    leaves,
  ])
  const { position, bind } = useDragAndPosition(paneWithPreBoxRef, name, pane)

  const style = useMemo(
    () =>
      (position
        ? {
            visibility: 'visible',
            position: 'fixed',
            top: position[1],
            left: position[0],
            transform: 'translate(-50%,-50%)',
            zIndex: 1,
          }
        : {}) as React.CSSProperties,
    [position]
  )
  return useMemo(
    () => (
      <>
        {position && <PreBox {...{ paneWithPreBoxRef, position }} />}
        <div {...{ ...bind(), style }} style={style}>
          {children}
        </div>
      </>
    ),
    [bind, children, position, style]
  )
}

export const DraggableTitle = memo(DraggableTitleInner)
