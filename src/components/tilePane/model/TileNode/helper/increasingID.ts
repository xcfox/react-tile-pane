const ref = { n: 0 }
export function increasingID() {
  const now = Date.now()
  return (ref.n++).toString(36) + ':' + now.toString(36)
}
