import { Game } from '../Game'
import { h } from '../ui'

export const TABS = ['islands', 'incursions', 'research'] as const

export type Tab = typeof TABS[number]

type Props = { game: Game }

const Tabs = ({ game }: Props) => {
  if (DEVELOPMENT) {
    return (
      <div className="flex col">
        {TABS.map(_ => {
          const active = _ === game.tab
          return (
            <button
              onClick={active ? () => {} : () => (game.tab = _)}
              className={active ? 'disabled' : ''}
            >
              {_}
            </button>
          )
        })}
        <button
          onClick={() => {
            ;(game.tab as any) = 'colors.dev'
          }}
        >
          Color Picker
        </button>
      </div>
    )
  } else {
    return (
      <div className="flex col">
        {TABS.map(_ => {
          const active = _ === game.tab
          return (
            <button
              onClick={active ? () => {} : () => (game.tab = _)}
              className={active ? 'disabled' : ''}
            >
              {_}
            </button>
          )
        })}
      </div>
    )
  }
}

export const GlobalTabs = ({ game }: Props) => (
  <div className="ruler">
    <div>Global View</div>
    <hr />
    <Tabs game={game} />
  </div>
)
