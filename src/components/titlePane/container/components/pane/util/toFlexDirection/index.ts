import { TabsBarPosition } from '../../../../config'

export function tabsBarPositionToFlexDirection(
  tabsBarPosition: TabsBarPosition
): 'column' | 'column-reverse' | 'row' | 'row-reverse' {
  switch (tabsBarPosition) {
    case 'top':
      return 'column'
    case 'bottom':
      return 'column-reverse'
    case 'left':
      return 'row'
    case 'right':
      return 'row-reverse'
  }
}
