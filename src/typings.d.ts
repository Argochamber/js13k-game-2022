declare module '*.txt' {
  const data: string
  export default data
}

declare module '*.spr' {
  const sprite: () => Promise<string>
  export default sprite
}

declare const DEVELOPMENT: boolean
