import { ReactChild } from 'react'

export type TileLeafID = string | number

export type TileLeaf<T = unknown> = {
  id: TileLeafID
  node: ReactChild
} & T

export function createTileLeaves<T extends Record<TileLeafID, ReactChild>>(
  obj: T
): [TileLeaf[], Record<keyof T, keyof T>] {
  const map = {} as Record<TileLeafID, keyof T>
  const list: TileLeaf[] = []
  Object.keys(obj).forEach((key) => {
    map[key] = key
    list.push({
      id: key,
      node: obj[key],
    })
  })
  return [list, map as Record<keyof T, keyof T>]
}
