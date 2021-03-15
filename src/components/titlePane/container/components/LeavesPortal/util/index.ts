import { LeafRefs } from '../..'
import { TilePaneLeaf } from '../../../..'
import { LeafPortalProps } from '../components'

export function unfoldLeafRefs(
  paneLeafRefs: LeafRefs[],
  paneLeaves: TilePaneLeaf[]
): LeafPortalProps[] {
  const leafPortals: LeafPortalProps[] = []
  paneLeafRefs.forEach((leafRef, i) => {
    const pane = paneLeaves[i]
    const ids = pane?.children ?? []
    ids.forEach((id) => {
      const leafDiv = leafRef[id]?.current
      if (!leafDiv) return
      leafPortals.push({ id, leafDiv })
    })
  })
  return leafPortals
}
