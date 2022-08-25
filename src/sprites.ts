/*
  Sprite manipulation module.
*/

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

  /**
   * Creates the image so it can be loaded.
   */
  async image(src: string) {
    const node = new Image()
    const loaded = new Promise(r => {
      node.onload = r
    })
    node.src = src
    await loaded
    return node
  }

  async print(src: string) {
    const image = await this.image(src)
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

/**
 * Runs a block function with the context, so the user can build images.
 * @param block
 * @returns
 */
export const sprite = async <T = void>(
  block: (
    builder: SpriteBuilder,
    context: CanvasRenderingContext2D
  ) => Promise<T>
) => {
  const canvas = document.createElement('canvas')
  const builder = new SpriteBuilder(canvas)
  return await block(builder, builder.context)
}

// type Vec2 = [number, number]
type Vec4 = [number, number, number, number]
type Pal = {
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

export const colored = (src: string, target: Pal) =>
  sprite(async (b, c) => {
    const image = await b.image(src)
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
    return b.url
  })

export const noised = (spr: string, amount: number) =>
  sprite(async (b, c) => {
    await b.print(spr)
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
    return b.url
  })
