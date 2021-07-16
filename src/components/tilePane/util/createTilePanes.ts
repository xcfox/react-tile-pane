import { ReactChild } from 'react'
import { PaneName, TilePane } from '..'

export function createTilePanes<T extends Record<PaneName, ReactChild>>(
  obj: T
): [TilePane[], Record<keyof T, keyof T>] {
  const map = {} as Record<PaneName, keyof T>
  const list: TilePane[] = []
  Object.keys(obj).forEach((key) => {
    map[key] = key
    list.push({
      name: key,
      child: obj[key],
    })
  })
  return [list, map as Record<keyof T, keyof T>]
}
