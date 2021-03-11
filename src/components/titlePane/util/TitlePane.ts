import { StretchBarEntity } from '.'
import { calcPosition, PanePosition } from './calcPosition'

export type TilePaneLayout = 'row' | 'column' | 'stack'

export class TilePaneEntity {
  // 输入值
  isRow?: boolean
  isStack?: boolean
  grow? = 1
  id?: string

  //只在构造时输入
  parent?: TilePaneEntity
  position: PanePosition

  // 需要转换的值
  children?: React.ReactChild | TilePaneEntity[]
  args: TitlePaneConstructor

  stretchBars?: StretchBarEntity[] | false

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
      // 如果子元素仍为 tile-panes
      const childrenPanes = calcPosition(this, children).map(
        (it) => new TilePaneEntity(it)
      )
      this.children = childrenPanes

      const bars = childrenPanes
        .map((pane, i, panes) => {
          const nextPane = panes[i + 1]
          return nextPane && new StretchBarEntity(this, pane, nextPane)
        })
        .filter((bar) => bar)
      this.stretchBars = bars
    } else {
      // 如果子元素为 React-child\
      this.children = children
    }
  }
}

export type TitlePaneConstructor = Omit<
  TilePaneEntity,
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
  'parent' | 'position' | 'child'
>
