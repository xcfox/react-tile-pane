export function removeInArray<T>(
  arr: T[],
  one: ((value: T, index: number, obj: T[]) => unknown) | T
) {
  const newArr = arr.slice()
  const index =
    one instanceof Function
      ? arr.findIndex(one)
      : arr.findIndex((it) => it === one)
  newArr.splice(index, 1)
  return newArr
}

export function replaceInArray<T>(
  arr: T[],
  one: ((value: T, index: number, obj: T[]) => unknown) | T,
  newOne: T
) {
  const newArr = arr.slice()
  const index =
    one instanceof Function
      ? arr.findIndex(one)
      : arr.findIndex((it) => it === one)
  newArr.splice(index, 1, newOne)
  return newArr
}
