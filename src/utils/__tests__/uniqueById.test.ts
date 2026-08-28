import { uniqueById } from '../uniqueById'

describe('uniqueById', () => {
  it('keeps only the first occurrence of each id', () => {
    const items = [
      { id: 1, title: 'a' },
      { id: 2, title: 'b' },
      { id: 1, title: 'a-duplicated' },
    ]

    expect(uniqueById(items)).toEqual([
      { id: 1, title: 'a' },
      { id: 2, title: 'b' },
    ])
  })

  it('returns the same items, in the same order, when there are no duplicates', () => {
    const items = [
      { id: 1, title: 'a' },
      { id: 2, title: 'b' },
      { id: 3, title: 'c' },
    ]

    expect(uniqueById(items)).toEqual(items)
  })

  it('returns an empty array when the input fails the typeof guard', () => {
    // Characterizes the current guard (`typeof items != 'object'`) as-is: it only
    // catches primitives like undefined/string/number — `null` is typeof 'object' too
    // and is NOT caught by this guard, so it is intentionally not exercised here.
    // @ts-expect-error exercising the guard with invalid input
    expect(uniqueById(undefined)).toEqual([])
    // @ts-expect-error exercising the guard with invalid input
    expect(uniqueById('not-an-array')).toEqual([])
  })
})
