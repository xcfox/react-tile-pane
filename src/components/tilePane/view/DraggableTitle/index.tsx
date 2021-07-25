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

export type DraggableTitleProps = {
  name: PaneName
  children?: React.ReactNode | ((isMoving: boolean) => React.ReactNode)
  style?: CSSProperties | ((isMoving: boolean) => CSSProperties)
  className?: string | ((isMoving: boolean) => string)
} & React.DOMAttributes<HTMLDivElement>

const DraggableTitleInner: React.FC<DraggableTitleProps> = (props) => {
  const { name } = props
  const paneWithPreBoxRef = useRef<PaneWithPreBox>()

  const pane = useContext(LeafContext)
  const { position, bind, isDragging } = useDragAndPosition(
    paneWithPreBoxRef,
    name,
    pane
  )

  const { style, className, children, rest } = useFn(props, isDragging)

  const [targetRef, rect] = useMeasure({ scroll: true })
  const setTitleRects = useContext(SetTitleRectsContext)

  const { left, height, top, width } = rect
  useEffect(() => {
    setTitleRects({ name, rect: { left, height, top, width } })
  }, [height, left, name, rect, setTitleRects, top, width])

  const styled = useMemo(
    () =>
      (position
        ? {
            ...style,
            visibility: 'visible',
            position: 'fixed',
            left: position[0],
            top: position[1],
            transform: 'translate(-50%,-50%)',
            zIndex: 1,
            userSelect: 'none',
          }
        : style) as React.CSSProperties,
    [position, style]
  )
  return useMemo(
    () => (
      <>
        {position && <PreBox {...{ paneWithPreBoxRef, position }} />}
        <div
          {...bind()}
          {...rest}
          ref={targetRef}
          style={styled}
          className={className}
        >
          {children}
        </div>
      </>
    ),
    [bind, children, className, position, rest, styled, targetRef]
  )
}

function useFn(
  {
    children: childrenFn,
    style: styleFn,
    className: classNameFn,
    ...rest
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
  return { style, children, className, rest }
}

export const DraggableTitle = memo(DraggableTitleInner)
export * from './typings'
export * from './hook/useMovingChecker'
