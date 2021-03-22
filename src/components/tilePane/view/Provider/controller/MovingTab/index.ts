import { MovingTabReducer } from '../..'

export const movingTabsReducer: MovingTabReducer = (
  movingTabs,
  { idToRemove, tabToInsert }
) => {
  const newMovingTabs = movingTabs.slice()
  if (idToRemove) {
    const index = newMovingTabs.findIndex((it) => (it.name = idToRemove))
    newMovingTabs.splice(index, 1)
  }
  if (tabToInsert) {
    const { name } = tabToInsert
    const existedTab = newMovingTabs.find((it) => (it.name = name))
    if (!existedTab) {
      newMovingTabs.push(tabToInsert)
    }
  }
  return newMovingTabs
}
