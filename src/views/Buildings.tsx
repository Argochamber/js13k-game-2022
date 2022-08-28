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
;(async () => {
  // HEADQUARTERS LOGO
  $`t dark 1 1 f r 90 d 0 0
t dark 1 1 f d 0 64
t dark 1 1 d 64 64
t dark 1 1 r 270 d 64 0
t bone 0 0 d 32 32`.then(s => (BUILDINGS[0]!.icon.value = s.data))
  // RESURRECTION ALTAR LOGO
  $`t bone 0 2 f d 20 64
t bone 0 2 d 44 64
@source-atop
t flesh 0 1 d 32 40
@screen
t flesh 1 2 a 0.3 d 36 6
t flesh 1 2 a 0.3 d 30 4
t flesh 1 2 a 0.3 d 28 8
@multiply
t dark 1 2 d 32 0`.then(s => (BUILDINGS[1]!.icon.value = s.data))
  // RITUAL MOUND LOGO
  $`t dark 0 2 f d 64 32
t dark 0 2 d 0 32
t dark 1 0 d 0 64
t dark 1 0 d 64 64
t dark 0 2 r -90 d 0 64
t dark 0 2 r -90 f d 64 64
t soul 1 2 a 0.5 d 38 38
t soul 1 2 a 0.5 d 28 28
t bone 1 2 d 32 16`.then(s => (BUILDINGS[3]!.icon.value = s.data))
  // SOUL GATE LOGO
  $`t soul 2 0 d 8 4
t soul 2 0 d 8 60
t soul 2 0 d 42 60
t soul 2 0 d 42 4
t soul 2 1 d 4 0
t bone 2 1 d 0 0
t bone 2 1 f d 60 0
t bone 0 2 f d 64 64
t bone 0 2 d 0 64`.then(s => (BUILDINGS[2]!.icon.value = s.data))
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
