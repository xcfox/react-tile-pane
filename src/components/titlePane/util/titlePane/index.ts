import { takeOverChild } from './takeOverChild'
import { reCalcChildGrow } from './reCalcChildGrow'
import { reCalcChildrenPosition } from './reCalcChildrenPosition'
import { removeSelf } from './removeSelf'
import { calcConstructor, PanePosition } from './calcPosition'

export type TilePaneLayout = 'row' | 'column' | 'stack'

export class TilePaneEntity {
  // 输入值
  isRow?: boolean
  isStack?: number | false
  grow = 1
  id?: string

  //只在构造时输入
  parent?: TilePaneEntity
  indexInParent?: number
  position = {
    top: 0,
    left: 0,
    width: 1,
    height: 1,
  } as PanePosition

  // 需要转换的值
  children?: React.ReactChild | TilePaneEntity[]

  // 固定值
  isTitlePane = true

  constructor(public args: TitlePaneConstructor) {
    Object.assign(this, args)
    const { children } = args
    if (children instanceof Array) {
      // 如果子元素仍为 tile-panes
      const childrenPanes = calcConstructor(this, children).map(
        (it) => new TilePaneEntity(it)
      )
      this.children = childrenPanes
    } else {
      // 如果子元素为 React-child\
      this.children = children
    }
  }

  reCalcChildrenPosition = reCalcChildrenPosition
  reCalcChildGrow = reCalcChildGrow
  removeSelf = removeSelf
  takeOverChild = takeOverChild
}

export type TitlePaneConstructor = Pick<
  TilePaneEntity,
  'isRow' | 'isStack' | 'id' | 'parent' | 'indexInParent'
> & {
  children: React.ReactChild | TitlePaneInterface[]
  position?: PanePosition
  grow?: number
}

export type TitlePaneInterface = Omit<
  TitlePaneConstructor,
  'parent' | 'position' | 'child'
>

export * from './calcPosition'
export * from './unfoldPane'
