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
