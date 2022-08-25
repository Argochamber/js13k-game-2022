import { Game } from '../Game'
import { Atlas, Sprite } from '../sprites'
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

Sprite.compose(256, 256, async ctx => {
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

  await atlas
    .at(0, 1)
    .rotated(-90)
    .then(_ => _.draw(ctx, 64, 0))
  await atlas
    .at(0, 1)
    .rotated(0)
    .then(_ => _.draw(ctx, 0, 64))
  await atlas
    .at(1, 1)
    .rotated(0)
    .then(_ => _.draw(ctx, 64, 64))
}).then(s => (st.value = s.data))

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
