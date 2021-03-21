import { MovingTabReducer } from '../..'

export const movingTabsReducer: MovingTabReducer = (
  movingTabs,
  { idToRemove, tabToInsert }
) => {
  const newMovingTabs = movingTabs.slice()
  if (idToRemove) {
    const index = newMovingTabs.findIndex((it) => (it.id = idToRemove))
    newMovingTabs.splice(index, 1)
  }
  if (tabToInsert) {
    const { id } = tabToInsert
    const existedTab = newMovingTabs.find((it) => (it.id = id))
    if (!existedTab) {
      newMovingTabs.push(tabToInsert)
    }
  }
  return newMovingTabs
}
