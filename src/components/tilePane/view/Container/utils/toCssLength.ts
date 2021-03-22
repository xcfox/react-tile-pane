import { TabsBarPosition } from '../..'

export function toCssLength(length: number) {
  return `${length * 100}%`
}

export function toCssCalcLength(
  percent: number,
  offset: string,
  mode: '+' | '-'
) {
  return `calc(${toCssLength(percent)} ${mode} ${offset})`
}

export const toQuadrant = (position: TabsBarPosition) => [
  (['top', 'bottom'] as TabsBarPosition[]).includes(position),
  (['right', 'bottom'] as TabsBarPosition[]).includes(position),
]

export const completeUnit = (len: number | string) =>
  typeof len === 'number' ? `${len}px` : len
