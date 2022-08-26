import { Game } from '../Game'
import { Atlas, Sprite } from '../sprites'
import { h, state } from '../ui'

type Props = { game: Game }

const atlases = Object.entries({
  dark: 'PThG/15cZP//////AAAA/z04Rv8kHzH/JB8x/5qZlv8=',
  soul: 'JqJp/zPRev+P8KT/0//E/zPRev8z0Xr/M9F6/4/wpP8=',
  ice: 'HHHY/zWE5P+ZwfH//////5nB8f+ZwfH/mcHx/5nB8f8=',
  bone: '5N3U/7qyp/9hW1L/CQkJ/+Td1P8AAAD/urKn//////8=',
}).reduce((o, [k, v]) => {
  o[k] = Atlas.from('sprites.png', [16, 16])
    .then(s => s.colored(v))
    .then(s => s.scaled(4, 4))
    .then(s => s.noised(0.1))
  return o
}, {} as Record<string, Promise<Atlas>>)

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
  const bone = await atlases.bone!
  const ice = await atlases.ice!
  const dark = await atlases.dark!
  const soul = await atlases.soul!
  ;[
    [0, 0],
    [1, 2],
    [2, 1],
    [1, 0],
  ].map((r, i) => {
    Sprite.compose(64, 64, async ctx => {
      await bone.at(...(r as [number, number])).draw(ctx, 0, 0)
    }).then(s => (BUILDINGS[i]!.icon.value = s.data))
  })
  // RITUAL MOUND LOGO
  Sprite.compose(128, 128, async ctx => {
    await dark
      .at(0, 2)
      .flipped()
      .then(_ => _.draw(ctx, 64, 32))
    await dark.at(0, 2).draw(ctx, 0, 32)
    await dark.at(1, 0).draw(ctx, 0, 64)
    await dark.at(1, 0).draw(ctx, 64, 64)
    await dark
      .at(0, 2)
      .rotated(-90)
      .then(_ => _.draw(ctx, 0, 64))
    await dark
      .at(0, 2)
      .rotated(-90)
      .then(_ => _.flipped())
      .then(_ => _.draw(ctx, 64, 64))
    await soul
      .at(1, 2)
      .faded(0.5)
      .then(_ => _.draw(ctx, 38, 38))
    await soul
      .at(1, 2)
      .faded(0.5)
      .then(_ => _.draw(ctx, 28, 28))
    await bone.at(1, 2).draw(ctx, 32, 16)
  }).then(s => (BUILDINGS[3]!.icon.value = s.data))
  // SOUL GATE LOGO
  Sprite.compose(128, 128, async ctx => {
    await soul.at(2, 0).draw(ctx, 8, 4)
    await soul.at(2, 0).draw(ctx, 8, 60)
    await soul.at(2, 0).draw(ctx, 42, 60)
    await soul.at(2, 0).draw(ctx, 42, 4)
    await bone.at(2, 1).draw(ctx, 4, 0)
    await bone
      .at(2, 1)
      .flipped()
      .then(_ => _.draw(ctx, 60, 0))
    await bone
      .at(0, 2)
      .flipped()
      .then(_ => _.draw(ctx, 64, 64))
    await bone.at(0, 2).draw(ctx, 0, 64)
  }).then(s => (BUILDINGS[2]!.icon.value = s.data))
  // TARTARUS GATE LOGO
  Sprite.compose(128, 128, async ctx => {
    await ice.at(2, 0).draw(ctx, 4, 4)
    await ice.at(2, 0).draw(ctx, 60, 4)
    await ice.at(2, 0).draw(ctx, 4, 60)
    await ice.at(2, 0).draw(ctx, 60, 60)
    await bone.at(2, 1).draw(ctx, 0, 0)
    await bone
      .at(2, 1)
      .rotated(90)
      .then(_ => _.draw(ctx, 64, 0))
    await bone
      .at(2, 1)
      .rotated(180)
      .then(_ => _.draw(ctx, 64, 64))
    await bone
      .at(2, 1)
      .rotated(-90)
      .then(_ => _.draw(ctx, 0, 64))
  }).then(s => (BUILDINGS[4]!.icon.value = s.data))
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
