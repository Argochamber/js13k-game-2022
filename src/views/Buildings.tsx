import { Game } from '../Game'
import { Island } from '../Island'
import { $ } from '../sprites'
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

// Compile the sprites
{
  // HEADQUARTERS LOGO
  $`*dark 1 1 f r 90 d 0 0
    *dark 1 1 f d 0 64
    *dark 1 1 d 64 64
    *dark 1 1 r 270 d 64 0
    *bone 0 0 d 32 32`.then(s => (BUILDINGS[0]!.icon.value = s.data))
  // RESURRECTION ALTAR LOGO
  $`*bone 0 2 f d 20 64
    *bone 0 2 d 44 64
    @source-atop
    *flesh 0 1 d 32 40
    @screen
    *flesh 1 2 a 0.3 d 36 6
    *flesh 1 2 a 0.3 d 30 4
    *flesh 1 2 a 0.3 d 28 8
    @multiply
    *dark 1 2 d 32 0`.then(s => (BUILDINGS[1]!.icon.value = s.data))
  // RITUAL MOUND LOGO
  $`*dark 0 2 f d 64 32
    *dark 0 2 d 0 32
    *dark 1 0 d 0 64
    *dark 1 0 d 64 64
    *dark 0 2 r -90 d 0 64
    *dark 0 2 r -90 f d 64 64
    *soul 1 2 a 0.5 d 38 38
    *soul 1 2 a 0.5 d 28 28
    *bone 1 2 d 32 16`.then(s => (BUILDINGS[3]!.icon.value = s.data))
  // SOUL GATE LOGO
  $`*soul 2 0 d 8 4
    *soul 2 0 d 8 60
    *soul 2 0 d 42 60
    *soul 2 0 d 42 4
    *soul 2 1 d 4 0
    *bone 2 1 d 0 0
    *bone 2 1 f d 60 0
    *bone 0 2 f d 64 64
    *bone 0 2 d 0 64`.then(s => (BUILDINGS[2]!.icon.value = s.data))
  // TARTARUS GATE LOGO
  $`*ice 2 0 d 4 4
    *ice 2 0 d 60 4
    *ice 2 0 d 4 60
    *ice 2 0 d 60 60
    *bone 2 1 d 0 0
    *bone 2 1 r 90 d 64 0
    *bone 2 1 r 180 d 64 64
    *bone 2 1 r -90 d 0 64`.then(s => (BUILDINGS[4]!.icon.value = s.data))
}

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
          const island = new Island(...game.selected).hydrate()
          island.buildings[building.id] += 1
          island.store()
          update()
        }}
      >
        <img className="sprite" src={building.icon.value ?? ''} />
        <div>
          <h1>
            {building.title} - level{' '}
            {new Island(...game.selected).hydrate().buildings[building.id]}
          </h1>
          {/* <p>{building.lore}</p> */}
          <small>{building.tip}</small>
        </div>
      </div>
    ))}
  </div>
)
