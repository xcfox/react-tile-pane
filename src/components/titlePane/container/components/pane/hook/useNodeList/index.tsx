import React, { useMemo } from 'react'
import { TileNodeID } from '../../../../..'

export function useNodeList(
  nodeList: { id: TileNodeID; node: React.ReactChild }[],
  currentTabIndex: number
) {
  return useMemo(
    () =>
      nodeList.map((it, i) => (
        <div
          style={{
            flexGrow: currentTabIndex === i ? 1 : 0,
            display: currentTabIndex === i ? 'inline' : 'none',
          }}
          key={i}
        >
          {it.node}
        </div>
      )),
    [currentTabIndex, nodeList]
  )
}
