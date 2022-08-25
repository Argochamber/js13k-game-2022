import { Game } from '../Game'
import { colored, noised, sprite } from '../sprites'
import { h, state } from '../ui'

type Props = { game: Game }

export const BUILDINGS = [
  { id: 'headquarter', title: 'Head Quarters' },
  { id: 'resurrect-altar', title: 'Resurrection Altar' },
  { id: 'soul-gate', title: 'Soul Gate' },
  { id: 'ritual-mound', title: 'Ritual Mound' },
  { id: 'tartarus-gate', title: 'Tartarus Gate' },
] as const

const st = state<string | null>(null)

sprite(async (builder, ctx) => {
  const spr = await colored('sprites.png', {
    base: [
      [230, 201, 195, 255],
      [255, 255, 255, 255],
      [88, 77, 238, 120],
      [245, 213, 206, 255],
    ],
    accent: [
      [245, 213, 206, 255],
      [88, 77, 238, 120],
      [88, 77, 75, 255],
    ],
    glint: [[225, 225, 255, 255]],
  })
  const image = await builder.image(spr)
  const noise = await sprite(async (b, c) => {
    b.size(256, 128)
    c.imageSmoothingEnabled = false
    c.drawImage(image, 16, 16, 32, 32, 0, 0, 64, 64)
    const n = await noised(b.url, 0.15)
    return builder.image(n)
  })
  const origi = await builder.image('sprites.png')
  builder.size(256, 128 * 3)
  ctx.getImageData(0, 0, 128 * 2, 128 * 3)
  ctx.imageSmoothingEnabled = false
  ctx.drawImage(image, 0, 0_0, 256, 128)
  ctx.drawImage(origi, 0, 128, 256, 128)
  ctx.drawImage(noise, 0, 256, 256, 128)
  st.value = builder.url
})

export const Buildings = ({}: Props) => (
  <div>
    <div>{st.value && <img src={st.value} />}</div>
    {BUILDINGS.map(building => (
      <div>
        <div>{building.title}</div>
        <hr />
      </div>
    ))}
  </div>
)
