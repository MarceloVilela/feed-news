export function uniqueById<T extends { id: unknown }>(items: T[]): T[] {
  if (typeof items != 'object') {
    return []
  }
  return items.filter(
    (value, index, self) =>
      self.findIndex((v) => v['id'] === value['id']) === index,
  )
}
