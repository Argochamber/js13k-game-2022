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

const revive = (_key: string, value: number | object | string) => {
  if (typeof value === 'string' && value.match(/^#date:/)) {
    const [, date] = value.match(/^#date:(.+)$/) ?? []
    return new Date(date ?? '')
  }
  return value
}

const replacer = (_key: string, value: unknown) => {
  if (
    value instanceof Date ||
    (typeof value === 'string' &&
      value.match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]+:[0-9]+:[0-9]+\.[0-9]+Z$/))
  ) {
    return `#date:${value}`
  }
  return value
}

/**
 * Local database access object.
 */
export const store = {
  set<T>(key: string, value: T) {
    localStorage.setItem(key, JSON.stringify(value, replacer))
  },
  get<T>(key: string) {
    return JSON.parse(localStorage.getItem(key) ?? 'null', revive) as T | null
  },
  hasData() {
    return localStorage.length > 0
  },
}

/** Horizontal expansion. */
const X = 0.2

/** Vertical displacement. */
const D = 0

/** Vertical scale. */
const R = 5

/** Parametric inverse logarithm of base e. */
export const invLog = (x: number) => (1 / Math.log(x * X + 2)) * R + D

export const pairs = <T extends {}>(o: T) =>
  Object.entries(o) as [keyof T, typeof o[keyof T]][]

export const formatTime = (ms: number) =>
  ms < 1000
    ? '< 1s'
    : ms < 60000
    ? Math.ceil(ms / 1000) + 's'
    : ms < 60 * 1000 * 60
    ? Math.ceil(ms / 60000) + 'm'
    : Math.ceil((ms / 60000) * 60) + 'h'

// prettier-ignore
const SEED = [
  'vezu', 'le', 'nel',
  'ua', 'elc', 'vho', 'va',
  'eali', 'inue',
  'helean', 'tuste', 'aun',
  'yean', 'thona', 'gs', 'chx',
  'fuer', 'avel', 'angorq',
  'qeze', 'phi', 'noura', 'chn',
  'zeol', 'amich', 'eax', 'uno',
  'emea', 'lome', 'datch',
  'aves', 'docia', 'venar', 'ech',
  'serdi', 'stado', 'ui',
  'havr', 'oste', 'don',
  'hew', 'ounr',
  'sch', 'nipe', 'nanmo',
  'disp', 'icer',
  'mesch', 'igh',
  'schn', 'iper',
  'sp', 'yga', 'nt',
  'med', 'id',
  'unme', 'dly',
  'eng', 'itect',
  'tnk',
  'demo', 'rta', 'liz', 'ed'
]

// Generates a random name, for islands.
export const rName = () =>
  [...Array(rint(2, 4))].map(() => SEED[rint(0, SEED.length - 1)]).join('')
