import React, { memo, useMemo } from 'react'
import { unfoldPane } from '../util'
import { TitlePane, TitlePaneInterface } from '../util/TitlePane'
import { toStyles } from './util/toStyles'

export interface PaneContainerProps {
  rootPane: TitlePaneInterface
}

const PaneContainerInner: React.FC<PaneContainerProps> = ({ rootPane }) => {
  const rootPaneEntity = useMemo(() => new TitlePane(rootPane), [rootPane])
  const panes = useMemo(
    () =>
      unfoldPane(rootPaneEntity).filter((p) => !(p.children instanceof Array)),
    [rootPaneEntity]
  )
  return useMemo(
    () => (
      <div style={{ position: 'relative', width: 800, height: 600 }}>
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
    [panes]
  )
}

export const PaneContainer = memo(PaneContainerInner)
