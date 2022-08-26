import { Game } from '../Game'
import { Atlas, Sprite } from '../sprites'
import { h, state } from '../ui'

type Props = { game: Game }

export const BUILDINGS = [
  {
    id: 'headquarter',
    title: 'Head Quarters',
    icon: state<string | null>(null),
  },
  {
    id: 'resurrect-altar',
    title: 'Resurrection Altar',
    icon: state<string | null>(null),
  },
  { id: 'soul-gate', title: 'Soul Gate', icon: state<string | null>(null) },
  {
    id: 'ritual-mound',
    title: 'Ritual Mound',
    icon: state<string | null>(null),
  },
  {
    id: 'tartarus-gate',
    title: 'Tartarus Gate',
    icon: state<string | null>(null),
  },
] as const
;(async () => {
  const atlas = await Atlas.from('sprites.png', [16, 16])
    .then(s => s.colored('5N3U/7qyp/9hW1L/CQkJ/+Td1P8AAAD/urKn//////8='))
    .then(s => s.scaled(4, 4))
    .then(s => s.noised(0.1))
  ;[
    [0, 0],
    [1, 2],
    [2, 1],
    [1, 0],
    [2, 0],
  ].map((r, i) => {
    Sprite.compose(64, 64, async ctx => {
      await atlas.at(...(r as [number, number])).draw(ctx, 0, 0)
    }).then(s => (BUILDINGS[i]!.icon.value = s.data))
  })
})()

export const Buildings = ({}: Props) => (
  <div>
    {BUILDINGS.map(building => (
      <div
        style={{
          display: 'flex',
          borderBottom: '2px solid gray',
          paddingBottom: '0.2rem',
          marginBottom: '1rem',
          paddingTop: '1rem',
          alignItems: 'end',
        }}
      >
        <img src={building.icon.value ?? ''} />
        <div
          style={{
            marginLeft: '1rem',
          }}
        >
          {building.title}
        </div>
      </div>
    ))}
  </div>
)
