import { calcPosition } from './calcPosition'

export type TitlePaneLayout = 'row' | 'column' | 'stack'

export class TitlePane {
  // 输入值
  isRow?: boolean
  isStack?: boolean
  grow? = 1

  //只在构造时输入
  parent?: TitlePane
  top: number
  left: number
  width: number
  height: number

  // 需要转换的值
  children: TitlePane[] | React.ReactChild

  // 固定值
  isTitlePane = true

  constructor(args: TitlePaneConstructor) {
    Object.assign(this, args)
    const { top, left, width, height, children } = args
    this.top = top
    this.left = left
    this.width = width
    this.height = height
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
  'constructor' | 'isTitlePane' | 'children'
> & {
  children: React.ReactChild | TitlePaneInterface[]
}

export type TitlePaneInterface = Omit<
  TitlePaneConstructor,
  'top' | 'left' | 'width' | 'height' | 'parent'
>
