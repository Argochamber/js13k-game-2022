import { Game } from '../Game'
import { Atlas, sprite } from '../sprites'
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
  const atlas = await Atlas.from('sprites.png', [16, 16])
    .then(s =>
      s.colored({
        base: [
          [230, 201, 195, 255],
          [255, 255, 255, 255],
          [50, 0, 238, 255],
          [245, 213, 206, 255],
        ],
        accent: [
          [245, 213, 206, 255],
          [88, 77, 238, 255],
          [88, 77, 75, 255],
        ],
        glint: [[225, 225, 255, 255]],
      })
    )
    .then(s => s.scaled(4, 4))
    .then(s => s.noised(0.15))
  ctx.drawImage(await atlas.at(2, 0).image(), 64, 64)
  ctx.drawImage(await atlas.at(0, 1).image(), 0, 0)
  ctx.drawImage(await atlas.at(1, 1).image(), 64, 0)
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
