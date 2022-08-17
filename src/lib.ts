export const Let = <T, R>(a: T, b: (t: T) => R) => b(a)
export const html = String.raw
