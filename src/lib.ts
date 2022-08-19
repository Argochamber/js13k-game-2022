/*
  Game's utility module.
*/

/**
 * Binds a value into a temporary block, this avoids declaring the variable again,
 * saving us from reserving variable names.
 * @param value The value to be wrapped.
 * @param block The block function that catches the immediate.
 * @returns Any value, if needed, or void.
 */
export const Let = <T, R>(value: T, block: (immediate: T) => R) => block(value)

/**
 * Wraps the given element (if any).
 * @param id The Element's ID
 * @param block The block to run with that element.
 * @returns Any value, if needed.
 */
export type $ =
  | (<E extends HTMLElement>(selector: string) => NodeListOf<E>)
  | (<E extends HTMLElement, R>(
      selector: string,
      block: (result: NodeListOf<E>) => R
    ) => R)
export const $ = <E extends HTMLElement, R>(
  selector: string,
  block?: (result: NodeListOf<E>) => R
) => {
  const r = document.querySelectorAll(selector)
  if (block == null) {
    return r
  } else {
    return block(r as any)
  }
}

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

export const html = String.raw
