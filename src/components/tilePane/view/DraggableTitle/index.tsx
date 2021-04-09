import React, {
  memo,
  useContext,
  useMemo,
  useRef,
  CSSProperties,
  useEffect,
} from 'react'
import useMeasure from 'react-use-measure'
import { TileLeavesContext } from '..'
import { PaneName } from '../..'
import { PreBox } from './components'
import { useDragAndPosition, useMovingChecker, useSpring } from './hook'
import { PaneWithPreBox } from './typings'
import { orFn } from './util'

export interface DraggableTitleProps {
  name: PaneName
  children?: React.ReactNode | ((isMoving: boolean) => React.ReactNode)
  style?: CSSProperties | ((isMoving: boolean) => CSSProperties)
  className?: string | ((isMoving: boolean) => string)
}

const DraggableTitleInner: React.FC<DraggableTitleProps> = (props) => {
  const { name } = props
  const paneWithPreBoxRef = useRef<PaneWithPreBox>()

  const leaves = useContext(TileLeavesContext)
  const pane = useMemo(() => leaves.find((p) => p.children.includes(name)), [
    leaves,
    name,
  ])
  const { position, bind, velocity } = useDragAndPosition(
    paneWithPreBoxRef,
    name,
    pane
  )
  const { style, className, children } = useFn(props)

  const [targetRef, rect] = useMeasure({ scroll: true })

  useEffect(() => {
    // console.log(name, rect)
  }, [name, rect])

  const scale = useSpring(velocity + 1)

  const styled = useMemo(
    () =>
      (position
        ? {
            ...style,
            visibility: 'visible',
            position: 'fixed',
            left: position[0],
            top: position[1],
            transform: `translate(-50%,-50%) scale(${scale})`,
            zIndex: 1,
          }
        : style) as React.CSSProperties,
    [position, scale, style]
  )
  return useMemo(
    () => (
      <>
        {position && <PreBox {...{ paneWithPreBoxRef, position }} />}
        <div {...bind()} ref={targetRef} style={styled} className={className}>
          {children}
        </div>
      </>
    ),
    [bind, children, className, position, styled, targetRef]
  )
}

function useFn({
  name,
  children: childrenFn,
  style: styleFn,
  className: classNameFn,
}: DraggableTitleProps) {
  const checkMoving = useMovingChecker()
  const isMoving = checkMoving(name)

  const style = useMemo(() => orFn(styleFn, isMoving), [isMoving, styleFn])
  const children = useMemo(() => orFn(childrenFn, isMoving), [
    childrenFn,
    isMoving,
  ])
  const className = useMemo(() => orFn(classNameFn, isMoving), [
    classNameFn,
    isMoving,
  ])
  return { style, children, className }
}

export const DraggableTitle = memo(DraggableTitleInner)
export * from './typings'
export * from './hook/useMovingChecker'
