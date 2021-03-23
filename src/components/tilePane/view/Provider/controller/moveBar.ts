import { StretchBarEntity, TileStore, unfold } from '../../..'

export type BarToMove = {
  distance: number
  bar: StretchBarEntity
}

export function moveBar(
  { rootNode, movingTabs }: TileStore,
  barToMove: BarToMove
): TileStore {
  const { bar, distance } = barToMove
  bar.move(distance)
  const nodes = unfold(rootNode)
  return { ...nodes, movingTabs, rootNode }
}
