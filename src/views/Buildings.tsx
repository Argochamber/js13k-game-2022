import { Game } from '../Game'
import { rint } from '../lib'
import { SpriteBuilder } from '../sprites'
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

SpriteBuilder.load([256, 256], 'sprites.png')
  .then(builder =>
    builder.build(async ctx => {
      ctx.imageSmoothingEnabled = false
      ctx.drawImage(builder.images[0]!, 0, 0, 256, 256)
      ctx.globalCompositeOperation = 'multiply'
      for (let i = 0; i < 256; i++) {
        for (let j = 0; j < 256; j++) {
          ctx.fillStyle = `rgb(${rint(0, j)}, ${rint(0, i)}, ${rint(0, 255)})`
          ctx.fillRect(i, j, 1, 1)
        }
      }
      ctx.globalCompositeOperation = 'destination-in'
      ctx.drawImage(builder.images[0]!, 0, 0, 256, 256)
    })
  )
  .then(builder => {
    st.value = builder.toDataURL()
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
