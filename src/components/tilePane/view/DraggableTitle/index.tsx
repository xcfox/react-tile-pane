import React, { memo, useContext, useMemo, useRef, CSSProperties } from 'react'
import { TileLeavesContext } from '..'
import { PaneName } from '../..'
import { PreBox } from './components'
import { useDragAndPosition } from './hook'
import { PaneWithPreBox } from './typings'

export interface DraggableTitleProps {
  name: PaneName
  children?: React.ReactNode
  style?: CSSProperties
  className?: string
}

const DraggableTitleInner: React.FC<DraggableTitleProps> = ({
  name,
  children,
  style,
  className,
}) => {
  const paneWithPreBoxRef = useRef<PaneWithPreBox>()

  const leaves = useContext(TileLeavesContext)
  const pane = useMemo(() => leaves.find((p) => p.children.includes(name)), [
    name,
    leaves,
  ])
  const { position, bind } = useDragAndPosition(paneWithPreBoxRef, name, pane)

  const styled = useMemo(
    () =>
      (position
        ? {
            ...style,
            visibility: 'visible',
            position: 'fixed',
            top: position[1],
            left: position[0],
            transform: 'translate(-50%,-50%)',
            zIndex: 1,
          }
        : style) as React.CSSProperties,
    [position, style]
  )
  return useMemo(
    () => (
      <>
        {position && <PreBox {...{ paneWithPreBoxRef, position }} />}
        <div {...{ ...bind() }} style={styled} className={className}>
          {children}
        </div>
      </>
    ),
    [bind, children, className, position, styled]
  )
}

export const DraggableTitle = memo(DraggableTitleInner)
export * from './typings'
