import { spr } from '../atlases'
import { Game } from '../Game'
import { Island } from '../Island'
import { $, Sprite } from '../sprites'
import { h, state, update } from '../ui'

type Props = { game: Game }

export const BUILDINGS = [
  {
    id: 'hq',
    title: 'Head Quarters',
    icon: state<string | null>(null),
    // lore: `Your island reunion place.`,
    tip: `Enhance the head quarters to continue evolving.`,
  },
  {
    id: 'altar',
    title: 'Resurrection Altar',
    icon: state<string | null>(null),
    // lore: `An altar for imbuing old corpses with souls, to make them move again.`,
    tip: `Use the resurection altar to convert souls into revenants, your main workforce.`,
  },
  {
    id: 'soulgate',
    title: 'Soul Gate',
    icon: state<string | null>(null),
    // lore: `The soul gate, a portal to another reality where souls from the living ones can be reaped.`,
    tip: `This yields passive income of souls depending on level.`,
  },
  {
    id: 'ritual',
    title: 'Ritual Mound',
    icon: state<string | null>(null),
    // lore: `The mound of the ritual sacrificie. Rituals are performed there in order to praise the higher gods.`,
    tip: `Use the ritual mound to advance technology.`,
  },
  {
    id: 'tartarus',
    title: 'Tartarus Gate',
    icon: state<string | null>(null),
    // lore: `A gateway to the core of the earth, where all titans and other eldrich abobinations are kept.`,
    tip: `Recruit special units with this building.`,
  },
] as const
;(async () => {
  // HEADQUARTERS LOGO
  Sprite.compose(128, 128, async ctx => {
    await (
      await spr
    ).dark
      .at(1, 1)
      .flipped()
      .then(_ => _.rotated(90))
      .then(_ => _.draw(ctx, 0, 0))
    await (
      await spr
    ).dark
      .at(1, 1)
      .flipped()
      .then(_ => _.draw(ctx, 0, 64))
    await (await spr).dark.at(1, 1).draw(ctx, 64, 64)
    await (
      await spr
    ).dark
      .at(1, 1)
      .plug()
      .then(_ => _.rotated(270))
      .then(_ => _.draw(ctx, 64, 0))
    await (await spr).bone.at(0, 0).draw(ctx, 32, 32)
  }).then(s => (BUILDINGS[0]!.icon.value = s.data))
  // RESURRECTION ALTAR LOGO
  Sprite.compose(128, 128, async ctx => {
    await (
      await spr
    ).bone
      .at(0, 2)
      .flipped()
      .then(_ => _.draw(ctx, 20, 64))
    await (await spr).bone.at(0, 2).draw(ctx, 44, 64)
    ctx.globalCompositeOperation = 'source-atop'
    await (await spr).flesh.at(0, 1).draw(ctx, 32, 40)
    ctx.globalCompositeOperation = 'screen'
    await (
      await spr
    ).flesh
      .at(1, 2)
      .faded(0.3)
      .then(_ => _.draw(ctx, 36, 6))
    await (
      await spr
    ).flesh
      .at(1, 2)
      .faded(0.3)
      .then(_ => _.draw(ctx, 30, 4))
    await (
      await spr
    ).flesh
      .at(1, 2)
      .faded(0.3)
      .then(_ => _.draw(ctx, 28, 8))
    ctx.globalCompositeOperation = 'multiply'
    await (await spr).dark.at(1, 2).draw(ctx, 32, 0)
  }).then(s => (BUILDINGS[1]!.icon.value = s.data))
  // RITUAL MOUND LOGO
  Sprite.compose(128, 128, async ctx => {
    await (
      await spr
    ).dark
      .at(0, 2)
      .flipped()
      .then(_ => _.draw(ctx, 64, 32))
    await (await spr).dark.at(0, 2).draw(ctx, 0, 32)
    await (await spr).dark.at(1, 0).draw(ctx, 0, 64)
    await (await spr).dark.at(1, 0).draw(ctx, 64, 64)
    await (
      await spr
    ).dark
      .at(0, 2)
      .rotated(-90)
      .then(_ => _.draw(ctx, 0, 64))
    await (
      await spr
    ).dark
      .at(0, 2)
      .rotated(-90)
      .then(_ => _.flipped())
      .then(_ => _.draw(ctx, 64, 64))
    await (
      await spr
    ).soul
      .at(1, 2)
      .faded(0.5)
      .then(_ => _.draw(ctx, 38, 38))
    await (
      await spr
    ).soul
      .at(1, 2)
      .faded(0.5)
      .then(_ => _.draw(ctx, 28, 28))
    await (await spr).bone.at(1, 2).draw(ctx, 32, 16)
  }).then(s => (BUILDINGS[3]!.icon.value = s.data))
  // SOUL GATE LOGO

  Sprite.compose(128, 128, async ctx => {
    await (await spr).soul.at(2, 0).draw(ctx, 8, 4)
    await (await spr).soul.at(2, 0).draw(ctx, 8, 60)
    await (await spr).soul.at(2, 0).draw(ctx, 42, 60)
    await (await spr).soul.at(2, 0).draw(ctx, 42, 4)
    await (await spr).bone.at(2, 1).draw(ctx, 4, 0)
    await (
      await spr
    ).bone
      .at(2, 1)
      .flipped()
      .then(_ => _.draw(ctx, 60, 0))
    await (
      await spr
    ).bone
      .at(0, 2)
      .flipped()
      .then(_ => _.draw(ctx, 64, 64))
    await (await spr).bone.at(0, 2).draw(ctx, 0, 64)
  }).then(s => (BUILDINGS[2]!.icon.value = s.data))
  // TARTARUS GATE LOGO
  $`t ice 2 0 d 4 4
t ice 2 0 d 60 4
t ice 2 0 d 4 60
t ice 2 0 d 60 60
t bone 2 1 d 0 0
t bone 2 1 r 90 d 64 0
t bone 2 1 r 180 d 64 64
t bone 2 1 r -90 d 0 64`.then(s => (BUILDINGS[4]!.icon.value = s.data))
})()

export const Buildings = ({ game }: Props) => (
  <div>
    {BUILDINGS.map(building => (
      <div
        className="flex pointer hover ruler"
        style={{
          paddingBottom: '0.2rem',
          marginBottom: '1rem',
          paddingTop: '1rem',
          alignItems: 'end',
        }}
        onClick={() => {
          const island = Island.getIsland(...game.selected)
          island.buildings[building.id] += 1
          Island.store(island)
          update()
        }}
      >
        <img className="sprite" src={building.icon.value ?? ''} />
        <div>
          <h1>
            {building.title} - level{' '}
            {Island.getIsland(...game.selected).buildings[building.id]}
          </h1>
          {/* <p>{building.lore}</p> */}
          <small>{building.tip}</small>
        </div>
      </div>
    ))}
  </div>
)
