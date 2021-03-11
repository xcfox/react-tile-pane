import { PanePosition } from '../../util'

export function toStyles(position: PanePosition): React.CSSProperties {
  const { top, left, width, height } = position
  return {
    top: top * 100 + '%',
    left: left * 100 + '%',
    width: width * 100 + '%',
    height: height * 100 + '%',
  }
}
