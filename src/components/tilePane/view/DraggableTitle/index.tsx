import React, {
  memo,
  useContext,
  useMemo,
  useRef,
  CSSProperties,
  useEffect,
} from 'react'
import useMeasure from 'react-use-measure'
import { LeafContext, SetTitleRectsContext } from '..'
import { PaneName } from '../..'
import { PreBox } from './components'
import { useDragAndPosition } from './hook'
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

  const pane = useContext(LeafContext)
  const { position, bind, velocity, isDragging } = useDragAndPosition(
    paneWithPreBoxRef,
    name,
    pane
  )

  const { style, className, children } = useFn(props, isDragging)

  const [targetRef, rect] = useMeasure({ scroll: true })
  const setTitleRects = useContext(SetTitleRectsContext)

  useEffect(() => {
    setTitleRects({ name, rect })
  }, [name, rect, setTitleRects])

  const styled = useMemo(
    () =>
      (position
        ? {
            ...style,
            visibility: 'visible',
            position: 'fixed',
            left: position[0],
            top: position[1],
            transform: `translate(-50%,-50%) scale(${velocity + 1})`,
            transitionProperty: 'transform',
            transitionDuration: '77ms',
            transitionTimingFunction: 'ease-out',
            zIndex: 1,
          }
        : style) as React.CSSProperties,
    [position, style, velocity]
  )
  return useMemo(
    () => (
      <>
        {isDragging && position && (
          <PreBox {...{ paneWithPreBoxRef, position }} />
        )}
        <div {...bind()} ref={targetRef} style={styled} className={className}>
          {children}
        </div>
      </>
    ),
    [bind, children, className, isDragging, position, styled, targetRef]
  )
}

function useFn(
  {
    children: childrenFn,
    style: styleFn,
    className: classNameFn,
  }: DraggableTitleProps,
  isMoving: boolean
) {
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
