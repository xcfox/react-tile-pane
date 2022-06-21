export function isNotNil<T>(target: T | undefined | null): target is T {
  return target !== null && target !== undefined
}
