/*
  Sprite manipulation module.
*/

/**
 * Procedural sprite builder, generates images.
 */
export class SpriteBuilder {
  /**
   * Creates a new builder by loading required resources first.
   * @param images
   * @returns
   */
  static load(size: [number, number], ...images: string[]) {
    return Promise.all(
      images.map(
        src =>
          new Promise<HTMLImageElement>(r => {
            const node = new Image()
            node.onload = () => r(node)
            node.src = src
          })
      )
    ).then(data => new SpriteBuilder(size, data))
  }

  constructor(
    readonly size: [number, number],
    readonly images: HTMLImageElement[]
  ) {}

  /**
   * Adds a new image to the sprite builder, if needed.
   * @param src The source.
   * @returns
   */
  async loadImage(src: string) {
    const node = new Image()
    const loaded = new Promise(r => {
      node.onload = r
    })
    node.src = src
    await loaded
    this.images.push(node)
    return this
  }

  /**
   * Runs a block function with the context, so the user can build images.
   * @param block
   * @returns
   */
  async build(block: (context: CanvasRenderingContext2D) => Promise<void>) {
    const canvas = document.createElement('canvas')
    canvas.width = this.size[0]
    canvas.height = this.size[1]
    const ctx = canvas.getContext('2d')
    if (ctx == null) {
      throw new Error(`Could not get the context.`)
    }
    await block(ctx)
    return canvas
  }
}
