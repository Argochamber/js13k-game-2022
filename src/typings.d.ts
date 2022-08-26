declare module '*.txt' {
  const data: string
  export default data
}

declare module '*.spr' {
  const sprite: (palette: Record<string, import('./sprites').Atlas>) => Promise<import('./sprites').Sprite>
  export default sprite
}

declare const DEVELOPMENT: boolean
