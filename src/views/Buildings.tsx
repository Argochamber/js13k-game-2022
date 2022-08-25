import { Game } from '../Game'
import { sprite, SpriteBuilder } from '../sprites'
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
  builder.size(256, 256)
  const image = await builder.image('sprites.png')
  ctx.imageSmoothingEnabled = false
  ctx.drawImage(image, 0, 0, 256, 256)
  ctx.globalCompositeOperation = 'multiply'
  ctx.fillStyle = 'red'
  ctx.fillRect(0, 0, builder.width, builder.height)
  ctx.globalCompositeOperation = 'destination-in'
  ctx.drawImage(image, 0, 0, 256, 256)
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
