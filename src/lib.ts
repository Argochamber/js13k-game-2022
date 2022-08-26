/*
  Game's utility module.
*/

export type Vec2 = [number, number]

export type Vec4 = [number, number, number, number]

/**
 * Generate a random integer between two values.
 */
export const rint = (from: number, to: number) =>
  (from + Math.random() * to) >> 0

/**
 * Generates an RGBA array from hex.
 */
export const hex2rgb = (str: string) => {
  const [, r, g, b, a] = str.match(
    /#?([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})?/i
  ) ?? [, '0', '0', '0']
  return [
    Number.parseInt(r ?? 'ff', 16),
    Number.parseInt(g ?? 'ff', 16),
    Number.parseInt(b ?? 'ff', 16),
    Number.parseInt(a ?? 'ff', 16),
  ] as Vec4
}

/** Converts **from** base64 */
export const from64 = (b64: string) => [...atob(b64)].map(_ => _.charCodeAt(0))

/** Converts **to** base64 */
export const to64 = (buffer: number[]) =>
  btoa(buffer.map(i => String.fromCharCode(i)).join(''))

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
