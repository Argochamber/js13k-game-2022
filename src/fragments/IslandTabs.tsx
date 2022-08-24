import { Game } from '../Game'
import { h } from '../ui'

export const TABS = ['island', 'buildings'] as const

export type Tab = typeof TABS[number]

type Props = { game: Game }

export const IslandsTab = ({ game }: Props) => (
  <div
    style={{
      borderBottom: '1px solid gray',
    }}
  >
    <div>Current Island</div>
    <hr />
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {TABS.map(_ => {
        const active = _ === game.tab
        return (
          <button
            onClick={active ? () => {} : () => (game.tab = _ as Tab)}
            className={active ? 'btn-disabled' : ''}
          >
            {_}
          </button>
        )
      })}
    </div>
  </div>
)
