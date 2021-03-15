import { TilePaneLeaf } from '../../util'
import { LeafRefs } from '../components'

export function initPaneLeafRefs(paneLeaves: TilePaneLeaf[]): LeafRefs[] {
  return paneLeaves.map((leaf) => {
    const dictionary = {} as LeafRefs
    leaf.children.forEach((id) => {
      dictionary[id] = null
    })
    return dictionary
  })
}
