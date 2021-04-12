import React, { createContext, useMemo, useReducer, Reducer } from 'react'
import { RectReadOnly } from 'react-use-measure'
import { PaneName } from '../../../..'

interface DispatchTitleRectsReducer {
  name: PaneName
  rect: RectReadOnly
}

export type TitleRectsReducer = Reducer<
  Record<PaneName, RectReadOnly>,
  DispatchTitleRectsReducer
>

const reducer: TitleRectsReducer = (state, { rect, name }) => {
  state[name] = rect
  return state
}

export const TitleRectsContext = createContext<Record<PaneName, RectReadOnly>>(
  {}
)
export const SetTitleRectsContext = createContext<
  React.Dispatch<DispatchTitleRectsReducer>
>(() => void null)

export const TitleRectsProvider: React.FC = ({ children }) => {
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
}

export const LeafWithTitleRectProvider: React.FC = ({ children }) => {
  return useMemo(() => <>{children}</>, [children])
}
