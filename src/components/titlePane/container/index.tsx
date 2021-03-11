import React, { memo, useMemo } from 'react'
import { unfoldPane } from '../util'
import { TitlePaneEntity, TitlePaneInterface } from '../util/TitlePane'
import { toStyles } from './util/toStyles'
export interface PaneContainerProps {
  rootPane: TitlePaneInterface
  width?: string | number
  height?: string | number
}

const PaneContainerInner: React.FC<PaneContainerProps> = ({
  rootPane,
  width = '100%',
  height = '100%',
}) => {
  const rootPaneEntity = useMemo(() => new TitlePaneEntity(rootPane), [
    rootPane,
  ])
  const panes = useMemo(
    () =>
      unfoldPane(rootPaneEntity).filter((p) => !(p.children instanceof Array)),
    [rootPaneEntity]
  )
  return useMemo(
    () => (
      <div style={{ position: 'relative', width, height }}>
        {panes.map((p, i) => (
          <div
            style={{
              position: 'absolute',
              border: 'solid',
              ...toStyles(p.position),
            }}
            key={p.id ?? i}
          >
            {p.children}
          </div>
        ))}
      </div>
    ),
    [height, panes, width]
  )
}

export const PaneContainer = memo(PaneContainerInner)
