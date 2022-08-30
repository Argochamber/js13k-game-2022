declare module '*.txt' {
  const data: string
  export default data
}

declare module '*.css' {
  const name: string
  export default name
}

declare const DEVELOPMENT: boolean
