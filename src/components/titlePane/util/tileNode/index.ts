import { ReactChild } from 'react'

export type TileNodeID = string | number

export type TileNode<T = unknown> = {
  id: TileNodeID
  node: ReactChild
} & T

export function createTileNodeList<T extends Record<TileNodeID, ReactChild>>(
  obj: T
): [TileNode[], Record<keyof T, keyof T>] {
  const map = {} as Record<TileNodeID, keyof T>
  const list: TileNode[] = []
  Object.keys(obj).forEach((key) => {
    map[key] = key
    list.push({
      id: key,
      node: obj[key],
    })
  })
  return [list, map as Record<keyof T, keyof T>]
}
