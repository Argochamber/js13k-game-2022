/*
  Sprite manipulation module.
*/
import { from64, Vec2 } from './lib'

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

type Palette = [
  number,
  number,
  number,
  number, // PRIMARY
  number,
  number,
  number,
  number, // SECONDARY
  number,
  number,
  number,
  number, // SHADOW
  number,
  number,
  number,
  number, // DARK
  number,
  number,
  number,
  number, // ACCENT 1
  number,
  number,
  number,
  number, // ACCENT 2
  number,
  number,
  number,
  number, // ACCENT 3
  number,
  number,
  number,
  number // GLINT
]

const palette = {
  ffffff: 0,
  bfbfbf: 1,
  '535353': 2,
  '090909': 3,
  ff0000: 4,
  '01ff00': 5,
  '00ff00': 5,
  '0000ff': 6,
  ffff00: 7,
} as Record<string, number>

export const rgb2hex = (...c: number[]) =>
  c.map(_ => _.toString(16).padStart(2, '0')).join('')

export class Sprite {
  static width = 128
  static height = 128
  static async compose(
    width: number,
    height: number,
    block: (ctx: CanvasRenderingContext2D) => Promise<void>
  ) {
    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    await block(canvas.getContext('2d')!)
    return new Sprite(canvas.toDataURL())
  }
  constructor(readonly data: string) {}
  image() {
    return loadImage(this.data)
  }
  plug() {
    return Promise.resolve(this)
  }
  async noised(amount: number) {
    const image = await loadImage(this.data)
    const w = image.naturalWidth
    const h = image.naturalHeight
    return Sprite.compose(w, h, async c => {
      c.drawImage(image, 0, 0)
      const info = c.getImageData(0, 0, w, h)
      c.globalCompositeOperation = 'multiply'
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
    const w = img.naturalWidth * scale[0]
    const h = img.naturalHeight * scale[1]
    return Sprite.compose(w, h, async c => {
      c.imageSmoothingEnabled = false
      c.drawImage(img, 0, 0, w, h)
    })
  }
  async colored(target: Palette) {
    const image = await loadImage(this.data)
    const w = image.naturalWidth
    const h = image.naturalHeight
    return Sprite.compose(w, h, async c => {
      c.drawImage(image, 0, 0)
      const info = c.getImageData(0, 0, w, h)
      for (let i = 0; i < info.data.length; i += 4) {
        const r = info.data[i]!
        const g = info.data[i + 1]!
        const b = info.data[i + 2]!
        const color = palette[`${rgb2hex(r, g, b)}`]
        if (color != null) {
          info.data[i] = target[color * 4 + 0]!
          info.data[i + 1] = target[color * 4 + 1]!
          info.data[i + 2] = target[color * 4 + 2]!
          info.data[i + 3] = target[color * 4 + 3]!
        }
      }
      c.putImageData(info, 0, 0)
    })
  }
  async rotated(angle: number) {
    const image = await loadImage(this.data)
    const w = image.naturalWidth
    const h = image.naturalHeight
    return Sprite.compose(w, h, async c => {
      c.imageSmoothingEnabled = false
      c.translate(w / 2, h / 2)
      c.rotate((angle * Math.PI) / 180)
      c.drawImage(image, 0, 0, w, h, -w / 2, -h / 2, w, h)
    })
  }
  async flipped() {
    const image = await loadImage(this.data)
    const w = image.naturalWidth
    const h = image.naturalHeight
    return Sprite.compose(w, h, async c => {
      c.scale(-1, 1)
      c.drawImage(image, -w, 0, w, h)
    })
  }
  async faded(alpha: number) {
    const image = await loadImage(this.data)
    const w = image.naturalWidth
    const h = image.naturalHeight
    return Sprite.compose(w, h, async c => {
      c.globalAlpha = alpha
      c.drawImage(image, 0, 0, w, h)
    })
  }
  async draw(ctx: CanvasRenderingContext2D, dx = 0, dy = 0) {
    ctx.drawImage(await this.image(), dx, dy)
  }
}

const rpm = (_: Sprite[][], f: (spr: Sprite) => Promise<Sprite>) =>
  Promise.all(_.map(spr => Promise.all(spr.map(f))))

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
        const spr = await Sprite.compose(tileSize[0], tileSize[1], async c => {
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
      await rpm(this.tiles, spr => spr.noised(amount))
    )
  }
  async scaled(...scale: Vec2) {
    return new Atlas(
      [this.tileSize[0] * scale[0], this.tileSize[1] * scale[1]],
      await rpm(this.tiles, spr => spr.scaled(...scale))
    )
  }
  async colored(palette: Palette | string) {
    if (typeof palette === 'string') {
      palette = from64(palette) as Palette
    }
    return new Atlas(
      this.tileSize,
      await rpm(this.tiles, spr => spr.colored(palette as Palette))
    )
  }
}

export const palettes = {
  dark: 'PThG/15cZP//////AAAA/z04Rv8kHzH/JB8x/5qZlv8=',
  soul: 'JqJp/zPRev+P8KT/0//E/zPRev8z0Xr/M9F6/4/wpP8=',
  ice: 'HHHY/zWE5P+ZwfH//////5nB8f+ZwfH/mcHx/5nB8f8=',
  bone: '5N3U/7qyp/9hW1L/CQkJ/+Td1P8AAAD/urKn//////8=',
  flesh: '9mFR/+0zO//gGyT/wBwo/6UdLf+lHS3/pR0t/+0zO/8=',
}

export const spr: Promise<Record<keyof typeof palettes, Atlas>> = (async () => {
  const spr: Record<keyof typeof palettes, Atlas> = {} as any
  for (const [k, v] of Object.entries(palettes)) {
    ;(spr as any)[k] = await Atlas.from('sprites.png', [16, 16])
      .then(s => s.colored(v))
      .then(s => s.scaled(4, 4))
      .then(s => s.noised(0.1))
  }
  return spr
})()

export const $ = async (
  template: {
    raw: ArrayLike<string> | readonly string[]
  },
  ...substitutions: any[]
) =>
  Sprite.compose(Sprite.width, Sprite.height, async ctx => {
    const s = await spr
    const tokens = (String.raw(template, ...substitutions).match(
      /[^ \n\r]+/g
    ) ?? [])[Symbol.iterator]()
    let state!: Sprite
    for (let tok = tokens.next(); !tok.done; tok = tokens.next()) {
      switch (tok.value) {
        case 't':
          {
            const name = (tok = tokens.next()).value as keyof typeof s
            const x = Number((tok = tokens.next()).value)
            const y = Number((tok = tokens.next()).value)
            state = s[name]!.at(x, y)
          }
          break
        case 'd':
          {
            const x = Number((tok = tokens.next()).value)
            const y = Number((tok = tokens.next()).value)
            await state.draw(ctx, x, y)
          }
          break
        case 'r':
          {
            const a = Number((tok = tokens.next()).value)
            state = await state.rotated(a)
          }
          break
        case 'f':
          state = await state.flipped()
          break
        case 'a':
          {
            const a = Number((tok = tokens.next()).value)
            state = await state.faded(a)
          }
          break
        default:
          if (tok.value.match(/^@/)) {
            ctx.globalCompositeOperation = tok.value.match(/[^@]+/)![0] as any
          }
      }
    }
  })
