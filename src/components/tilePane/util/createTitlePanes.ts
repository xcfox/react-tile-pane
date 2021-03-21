import { ReactChild } from 'react'
import { TileNodeID, TilePane } from '..'

export function createTitlePanes<T extends Record<TileNodeID, ReactChild>>(
  obj: T
): [TilePane[], Record<keyof T, keyof T>] {
  const map = {} as Record<TileNodeID, keyof T>
  const list: TilePane[] = []
  Object.keys(obj).forEach((key) => {
    map[key] = key
    list.push({
      id: key,
      child: obj[key],
    })
  })
  return [list, map as Record<keyof T, keyof T>]
}
