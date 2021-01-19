import { calcPosition, PanePosition } from './calcPosition'

export type TitlePaneLayout = 'row' | 'column' | 'stack'

export class TitlePane {
  // 输入值
  isRow?: boolean
  isStack?: boolean
  grow? = 1

  //只在构造时输入
  parent?: TitlePane
  position: PanePosition

  // 需要转换的值
  children: React.ReactChild | TitlePane[]
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
        (it) => new TitlePane(it)
      )
    } else {
      // 如果子元素为 React-child
      this.children = children
    }
  }
}

export type TitlePaneConstructor = Omit<
  TitlePane,
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
