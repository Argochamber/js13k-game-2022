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
export const $ = <T, R>(value: T, block: (immediate: T) => R) => block(value)

/**
 * Wraps the given element (if any).
 * @param id The Element's ID
 * @param block The block to run with that element.
 * @returns Any value, if needed.
 */
export const $e = <R>(id: string, block: (immediate: HTMLElement) => R) =>
  block(document.getElementById(id))

export const $u = <T>(key: string, value: T) => {
  const data = JSON.parse(localStorage.getItem('$?') ?? '{}')
  data[key] = value
  localStorage.setItem('$?', JSON.stringify(data))
}

export const $r = <T>(key: string) =>
  JSON.parse(localStorage.getItem('$?') ?? '{}')[key] as T | undefined

export const html = String.raw
