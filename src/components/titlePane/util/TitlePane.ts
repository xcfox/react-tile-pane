import { calcPosition, PanePosition } from './calcPosition'

export type TitlePaneLayout = 'row' | 'column' | 'stack'

export class TitlePaneEntity {
  // 输入值
  isRow?: boolean
  isStack?: boolean
  grow? = 1
  id?: string

  //只在构造时输入
  parent?: TitlePaneEntity
  position: PanePosition

  // 需要转换的值
  children: React.ReactChild | TitlePaneEntity[]
  args: TitlePaneConstructor

  // 固定值
  isTitlePane = true

  constructor(args: TitlePaneConstructor) {
    Object.assign(this, args)
    this.args = args
    const {
      position = {
        top: 0,
        left: 0,
        width: 1,
        height: 1,
      },
      children,
    } = args
    this.position = position
    if (children instanceof Array) {
      // 如果子元素仍为 title-panes
      this.children = calcPosition(this, children).map(
        (it) => new TitlePaneEntity(it)
      )
    } else {
      // 如果子元素为 React-child
      this.children = children
    }
  }
}

export type TitlePaneConstructor = Omit<
  TitlePaneEntity,
  | 'constructor'
  | 'isTitlePane'
  | 'children'
  | 'position'
  | 'childrenFromArgs'
  | 'args'
> & {
  children: React.ReactChild | TitlePaneInterface[]
  position?: PanePosition
}

export type TitlePaneInterface = Omit<
  TitlePaneConstructor,
  'parent' | 'position'
>
