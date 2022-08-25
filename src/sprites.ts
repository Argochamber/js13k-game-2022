/*
  Sprite manipulation module.
*/

/**
 * Creates the image so it can be loaded.
 */
export const loadImage = async (src: string) => {
  const node = new Image()
  const loaded = new Promise(r => {
    node.onload = r
  })
  node.src = src
  await loaded
  return node
}

/**
 * Procedural sprite builder, generates images.
 */
export class SpriteBuilder {
  readonly context: CanvasRenderingContext2D
  constructor(readonly canvas: HTMLCanvasElement) {
    this.context = canvas.getContext('2d')!
  }

  /**
   * Sets canvas size.
   */
  size(width: number, height: number) {
    this.canvas.width = width
    this.canvas.height = height
  }

  async print(src: string) {
    const image = await loadImage(src)
    const w = image.naturalWidth
    const h = image.naturalHeight
    this.size(w, h)
    this.context.drawImage(image, 0, 0)
    return image
  }

  get info() {
    return this.context.getImageData(0, 0, this.width, this.height)
  }
  get url() {
    return this.canvas.toDataURL()
  }
  get width() {
    return this.canvas.width
  }
  get height() {
    return this.canvas.height
  }
}

type Vec2 = [number, number]
type Vec4 = [number, number, number, number]
type Palette = {
  base: [Vec4, Vec4, Vec4, Vec4]
  accent: [Vec4, Vec4, Vec4]
  glint: [Vec4]
}

const palette = {
  ffffff: ['base', 0],
  bfbfbf: ['base', 1],
  '535353': ['base', 2],
  '090909': ['base', 3],
  ff0000: ['accent', 0],
  '01ff00': ['accent', 1],
  '0000ff': ['accent', 2],
  ffff00: ['glint', 0],
} as Record<string, ['base' | 'accent' | 'glint', 0 | 1 | 2 | 3]>

export const rgb2hex = (...c: number[]) =>
  c.map(_ => _.toString(16).padStart(2, '0')).join('')

export class Sprite {
  static async compose(
    block: (
      ctx: CanvasRenderingContext2D,
      builder: SpriteBuilder
    ) => Promise<void>
  ) {
    const canvas = document.createElement('canvas')
    const builder = new SpriteBuilder(canvas)
    await block(builder.context, builder)
    return new Sprite(builder.url)
  }
  constructor(readonly data: string) {}
  image() {
    return loadImage(this.data)
  }
  async noised(amount: number) {
    return Sprite.compose(async (c, b) => {
      await b.print(this.data)
      c.globalCompositeOperation = 'multiply'
      const info = b.info
      for (let i = 0; i < info.data.length; i += 4) {
        const r = 1 - Math.random() * amount
        const g = 1 - Math.random() * amount
        const b = 1 - Math.random() * amount
        info.data[i] *= r
        info.data[i + 1] *= g
        info.data[i + 2] *= b
      }
      c.putImageData(info, 0, 0)
    })
  }
  async scaled(...scale: Vec2) {
    const img = await this.image()
    return Sprite.compose(async (c, b) => {
      const w = img.naturalWidth * scale[0]
      const h = img.naturalHeight * scale[1]
      b.size(w, h)
      c.imageSmoothingEnabled = false
      c.drawImage(img, 0, 0, w, h)
    })
  }
  async colored(target: Palette) {
    return Sprite.compose(async (c, b) => {
      const image = await loadImage(this.data)
      const w = image.naturalWidth
      const h = image.naturalHeight
      b.size(w, h)
      c.drawImage(image, 0, 0)
      const info = c.getImageData(0, 0, w, h)
      for (let i = 0; i < info.data.length; i += 4) {
        const r = info.data[i]!
        const g = info.data[i + 1]!
        const b = info.data[i + 2]!
        const color = palette[`${rgb2hex(r, g, b)}`]
        if (color != null) {
          const c = target[color[0]][color[1]]!
          info.data[i] = c[0]
          info.data[i + 1] = c[1]
          info.data[i + 2] = c[2]
          info.data[i + 3] = c[3]
        }
      }
      c.putImageData(info, 0, 0)
    })
  }
}

export class Atlas {
  constructor(readonly tileSize: Vec2, readonly tiles: Sprite[][]) {}
  at(x: number, y: number): Sprite {
    return this.tiles[x]?.[y]!
  }
  static async from(image: string, tileSize: Vec2) {
    const sheet = await loadImage(image)
    const tiles: Sprite[][] = []
    const count = {
      x: sheet.naturalWidth / tileSize[0],
      y: sheet.naturalHeight / tileSize[1],
    }
    for (let i = 0; i < count.x; i++) {
      const row: Sprite[] = []
      for (let j = 0; j < count.y; j++) {
        const spr = await Sprite.compose(async (c, b) => {
          b.size(...tileSize)
          c.drawImage(
            sheet,
            i * tileSize[0],
            j * tileSize[1],
            tileSize[0],
            tileSize[1],
            0,
            0,
            tileSize[0],
            tileSize[1]
          )
        })
        row.push(spr)
      }
      tiles.push(row)
    }
    return new Atlas(tileSize, tiles)
  }
  async noised(amount: number) {
    return new Atlas(
      this.tileSize,
      await Promise.all(
        this.tiles.map(spr => Promise.all(spr.map(spr => spr.noised(amount))))
      )
    )
  }
  async scaled(...scale: Vec2) {
    return new Atlas(
      [this.tileSize[0] * scale[0], this.tileSize[1] * scale[1]],
      await Promise.all(
        this.tiles.map(spr => Promise.all(spr.map(spr => spr.scaled(...scale))))
      )
    )
  }
  async colored(palette: Palette) {
    return new Atlas(
      this.tileSize,
      await Promise.all(
        this.tiles.map(spr => Promise.all(spr.map(spr => spr.colored(palette))))
      )
    )
  }
}
