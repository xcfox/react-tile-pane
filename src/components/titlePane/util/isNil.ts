export function isNotNil<T extends unknown>(
  target: T | undefined | null
): target is T {
  return target !== null && target !== undefined
}
