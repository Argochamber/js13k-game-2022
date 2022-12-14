import { Game } from '../Game'
import { Island } from '../Island'
import { formatTime } from '../lib'
import { $ } from '../sprites'
import { msg } from '../toastController'
import { h, state, update } from '../ui'

type Props = { game: Game }

const UNITS = [
  {
    id: 'revenant',
    name: 'Revenant',
    lore: '',
    description: '',
    icon: state<null | string>(null),
  },
  {
    id: 'acolyte',
    name: 'Acolyte',
    lore: '',
    description: '',
    icon: state<null | string>(null),
  },
  {
    id: 'titan',
    name: 'Titan',
    lore: '',
    description: '',
    icon: state<null | string>(null),
  },
] as const

{
  $`*bone 1 1 r 180 d 26 64
    *bone 1 1 r 180 f d 36 64
    *bone 1 2 d 32 0`.then(s => (UNITS[0].icon.value = s.data))
  $`*flesh 1 1 d 64 64
    *flesh 1 1 r 90 d 0 64
    *flesh 1 1 r 180 d 0 0
    *flesh 1 1 f r 180 d 64 0
    *dark 1 2 d 32 0
    *dark 0 2 r 180 d 8 64
    *dark 0 2 r 180 f d 56 64
    `.then(s => (UNITS[1].icon.value = s.data))
  $`*soul 2 1 a 0.5 d 0 64
    *soul 2 1 a 0.5 f d 64 64
    *soul 2 1 a 0.5 f d 64 54
    *soul 2 1 a 0.5 d 0 54
    *soul 1 2 a 0.5 d 32 0
    *soul 1 2 a 0.5 d 28 8
    *soul 1 2 a 0.5 d 36 8
    *bone 2 1 d 8 60
    *bone 2 1 f d 58 60
    *bone 1 2 d 32 8`.then(s => (UNITS[2].icon.value = s.data))
}

export const Units = ({ game }: Props) => {
  const island = new Island(...game.selected).hydrate()

  // On click
  const handleRecruit = (unit: typeof UNITS[number]) => () => {
    const cost = island.productionCost(unit.id)
    if (cost.souls > game.souls) {
      msg(`Not enough souls`)
      return
    }
    const queue = island.queue.produce[unit.id]
    if (queue.queue === 0) {
      queue.lastProduced = new Date()
    }
    queue.queue += 1
    game.souls -= cost.souls
    msg(`Recruiting ${unit.name}...`)
    island.store()
    update()
  }

  return (
    <div>
      <h2>Units in {island.name}</h2>
      <hr />
      <div className="flex col">
        {UNITS.map(unit => (
          <div
            className="flex ruler wide padded pointer hover"
            onClick={handleRecruit(unit)}
          >
            <img src={unit.icon.value ?? ''} className="sprite" />
            <div>
              <h3>{unit.name}</h3>
              <p>Amount: {island.units[unit.id]}</p>
              <p>Cost: {island.productionCost(unit.id).souls} souls</p>
              <p>
                Production time:{' '}
                {formatTime(island.productionCost(unit.id).time)}
              </p>
              {island.queue.produce[unit.id].queue > 0 ? (
                <div>
                  <small>
                    Queued {island.queue.produce[unit.id].queue} units.
                    Remaining time:{' '}
                    {formatTime(
                      island.queue.produce[unit.id].lastProduced.getTime() +
                        island.productionCost(unit.id).time *
                          island.queue.produce[unit.id].queue -
                        Date.now()
                    )}
                  </small>
                </div>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
