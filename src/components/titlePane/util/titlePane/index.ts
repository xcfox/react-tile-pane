import { takeOverChild } from './takeOverChild'
import { reCalcChildGrow } from './reCalcChildGrow'
import { reCalcChildrenPosition } from './reCalcChildrenPosition'
import { removeSelf } from './removeSelf'
import { calcConstructor, PanePosition } from './calcPosition'
import { TileLeafID } from '..'
import { removeTab } from './removeTab'

export type TilePaneLayout = 'row' | 'column' | 'stack'

export class TilePaneEntity {
  // 输入值
  isRow?: boolean
  onTab?: number
  grow = 1
  id: string

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
  children: TileLeafID[] | TilePaneEntity[]

  // 固定值
  isTitlePane = true

  constructor(public args: TitlePaneConstructor) {
    Object.assign(this, args)
    const { children } = args
    if (children instanceof Array) {
      // 如果子元素仍为 tile-panes
      if (isTileNodeIDs(children)) {
        this.children = children
      } else {
        const childrenPanes = calcConstructor(this, children).map(
          (it) => new TilePaneEntity(it)
        )
        this.children = childrenPanes
      }
    } else {
      // 如果子元素为 React-Child
      this.children = [children]
    }
    this.id = Math.random().toString()
  }

  reCalcChildrenPosition = reCalcChildrenPosition
  reCalcChildGrow = reCalcChildGrow
  removeSelf = removeSelf
  removeTab = removeTab
  takeOverChild = takeOverChild
}

export type TilePaneBranch = Omit<TilePaneEntity, 'children'> & {
  children: TilePaneEntity[]
}

export type TilePaneLeaf = Omit<TilePaneEntity, 'children'> & {
  children: TileLeafID[]
}

export function isTileNodeIDs(
  list: TileLeafID[] | TitlePaneInterface[] | TilePaneEntity[]
): list is TileLeafID[] {
  return !(list[0] instanceof Object)
}

export type TitlePaneConstructor = Pick<
  TilePaneEntity,
  'isRow' | 'onTab' | 'parent' | 'indexInParent'
> & {
  children: TileLeafID | TileLeafID[] | TitlePaneInterface[]
  position?: PanePosition
  grow?: number
}

export type TitlePaneInterface = Omit<
  TitlePaneConstructor,
  'parent' | 'position' | 'child' | 'renderReactComponent'
>

export * from './calcPosition'
export * from './unfoldPane'
export * from './calcPreBox'
