import { Game } from '../Game'
import { colored, loadImage, noised, sprite } from '../sprites'
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
  const noise = await sprite(async (b, c) => {
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
    const image = await loadImage(spr)
    b.size(64 * 3, 64 * 2)
    c.imageSmoothingEnabled = false
    c.drawImage(image, 0, 0, 64 * 3, 64 * 2)
    const n = await noised(b.url, 0.15)
    return loadImage(n)
  })
  builder.size(256, 256)
  ctx.imageSmoothingEnabled = false
  ctx.drawImage(noise, 64 * 2, 64 * 0, 64, 64, 0, 0, 64, 64)
  ctx.drawImage(noise, 64 * 0, 64 * 1, 64, 64, 0, 64, 64, 64)
  ctx.drawImage(noise, 64 * 0, 64 * 1, 64, 64, 64, 0, 64, 64)
  ctx.drawImage(noise, 64 * 1, 64 * 1, 64, 64, 64, 64, 64, 64)
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
