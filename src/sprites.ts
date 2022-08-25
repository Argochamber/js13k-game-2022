/*
  Sprite manipulation module.
*/

/**
 * Procedural sprite builder, generates images.
 */
export class SpriteBuilder {
  constructor(readonly canvas: HTMLCanvasElement) {}

  /**
   * Sets canvas size.
   */
  size(width: number, height: number) {
    this.canvas.width = width
    this.canvas.height = height
  }

  /**
   * Adds a new image to the sprite builder, if needed.
   * @param src The source.
   * @returns
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
  const ctx = canvas.getContext('2d')
  if (ctx == null) {
    throw new Error(`Could not get the context.`)
  }
  const builder = new SpriteBuilder(canvas)
  return await block(builder, ctx)
}
