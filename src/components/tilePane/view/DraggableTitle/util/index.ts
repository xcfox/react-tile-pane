export function orFn<As extends unknown[], T = unknown>(
  orFunc: T | ((...args: As) => T),
  ...args: As
) {
  return typeof orFunc === 'function'
    ? (orFunc as (...args: As) => T)(...args)
    : orFunc
}
