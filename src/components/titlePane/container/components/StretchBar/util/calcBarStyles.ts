import { StretchBarEntity } from '../../../..'

export function calcBarStyles(bar: StretchBarEntity) {
  const { top, left, width, height } = bar.nextPane.position
  const { isRow } = bar.parentPane
  return {
    top: top * 100 + '%',
    left: left * 100 + '%',
    width: isRow ? 3 : width * 100 + '%',
    height: isRow ? height * 100 + '%' : 3,
  }
}
