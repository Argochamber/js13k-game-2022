import { Game } from '../Game'
import { Island } from '../Island'
import { h, state } from '../ui'

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

export const Units = ({ game }: Props) => {
  const island = Island.getIsland(...game.selected)
  return (
    <div>
      <h2>Units in {island.name}</h2>
      <hr />
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {UNITS.map(unit => (
          <div
            style={{
              display: 'flex',
              width: '100%',
              borderBottom: '2px solid gray',
              padding: '1rem',
            }}
          >
            <img
              src={unit.icon.value ?? ''}
              style={{ width: '128px', height: '128px', marginRight: '1rem' }}
            />
            <div>
              <h3>{unit.name}</h3>
              <p>Amount: {island.units[unit.id]}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
