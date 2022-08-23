/*
  Game's utility module.
*/

/**
 * Generate a random integer between two values.
 */
export const rint = (from: number, to: number) =>
  (from + Math.random() * to) >> 0

/**
 * Local database access object.
 */
export const store = {
  set<T>(key: string, value: T) {
    const data = JSON.parse(localStorage.getItem('database') ?? '{}')
    data[key] = value
    localStorage.setItem('database', JSON.stringify(data))
  },
  get<T>(key: string) {
    return JSON.parse(localStorage.getItem('database') ?? '{}')[key] as
      | T
      | undefined
  },
  hasData() {
    return localStorage.getItem('database') != null
  },
}
