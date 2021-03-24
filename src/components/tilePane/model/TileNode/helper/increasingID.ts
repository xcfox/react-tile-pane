const ref = { n: 0 }
export function increasingID() {
  return (ref.n++).toString(36)
}
