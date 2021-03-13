export function inLimit(value: number, max: number, min = 0): number {
  if (value < min) return min
  if (value > max) return max
  return value
}
