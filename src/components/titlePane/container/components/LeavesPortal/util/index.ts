import { TileLeafID } from '../../../..'

export const sleepingLeaves: TileLeafID[] = []

// export function unfoldLeafRefs(
//   paneLeafRefs: LeafRefs[],
//   paneLeaves: TilePaneLeaf[],
//   sleepRef: React.RefObject<HTMLDivElement>
// ): LeafPortalProps[] {
//   const sleepDiv = sleepRef.current
//   if (!sleepDiv) return []
//   const leafPortals: LeafPortalProps[] = sleepingLeaves.map((id) => ({
//     id,
//     leafDiv: sleepDiv,
//   }))
//   paneLeafRefs.forEach((leafRef, i) => {
//     const pane = paneLeaves[i]
//     const ids = pane?.children ?? []
//     ids.forEach((id) => {
//       if (sleepingLeaves.includes(id)) return
//       const leafDiv = leafRef[id]?.current
//       if (!leafDiv) return
//       leafPortals.push({ id, sleepDiv: leafDiv })
//     })
//   })
//   return leafPortals
// }
