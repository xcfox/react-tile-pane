import React, {
  createContext,
  useMemo,
  useReducer,
  Reducer,
  useContext,
} from 'react'
import { RectReadOnly } from 'react-use-measure'
import {
  ContainerRectContext,
  PaneName,
  TileNodeRect,
  Vector2,
} from '../../../..'

interface DispatchTitleRectsReducer {
  name: PaneName
  rect: TileNodeRect
}

export type TitleRectsReducer = Reducer<
  Record<PaneName, TileNodeRect>,
  DispatchTitleRectsReducer
>

export const TitleRectsContext = createContext<Record<PaneName, TileNodeRect>>(
  {}
)
export const SetTitleRectsContext = createContext<
  React.Dispatch<DispatchTitleRectsReducer>
>(() => void null)

export const TitleRectsProvider: React.FC = ({ children }) => {
  const containerRect = useContext(ContainerRectContext)
  const [titleRects, setTitleRects] = useReducer<TitleRectsReducer>(reducer, {})

  return useMemo(
    () => (
      <TitleRectsContext.Provider value={titleRects}>
        <SetTitleRectsContext.Provider value={setTitleRects}>
          {children}
        </SetTitleRectsContext.Provider>
      </TitleRectsContext.Provider>
    ),
    [children, titleRects]
  )
  function reducer(
    state: Record<PaneName, TileNodeRect>,
    { rect, name }: DispatchTitleRectsReducer
  ) {
    const [left, top] = absolute2Relative(containerRect, rect.left, rect.top)
    const [right, bottom] = absolute2Relative(
      containerRect,
      rect.left + rect.width,
      rect.top + rect.height
    )
    const width = right - left
    const height = bottom - top
    state[name] = { left, height, width, top }
    return state
  }
}

export const LeafWithTitleRectProvider: React.FC = ({ children }) => {
  return useMemo(() => <>{children}</>, [children])
}

export function absolute2Relative(
  containerRect: RectReadOnly,
  x: number,
  y: number
) {
  return [
    (x - containerRect.left) / containerRect.width,
    (y - containerRect.top) / containerRect.height,
  ] as Vector2
}
