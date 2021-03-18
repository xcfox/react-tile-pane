export function calcChildGrows(children: { grow?: number }[]) {
  const growsSolid = children.map((c) => c.grow ?? 1)
  const growSum = growsSolid.reduce((s, n) => (s += n), 0) // 部分值
  const grows = growsSolid.map((c) => c / growSum) // 相对值
  return grows
}
