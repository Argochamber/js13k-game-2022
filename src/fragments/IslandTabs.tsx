import { Game } from '../Game'
import { h } from '../ui'

export const TABS = ['island', 'buildings', 'units'] as const

export type Tab = typeof TABS[number]

type Props = { game: Game }

export const IslandsTab = ({ game }: Props) => (
  <div className="ruler">
    <div>Current Island</div>
    <hr />
    <div className="flex col">
      {TABS.map(_ => {
        const active = _ === game.tab
        return (
          <button
            onClick={active ? () => {} : () => (game.tab = _ as Tab)}
            className={active ? 'disabled' : ''}
          >
            {_}
          </button>
        )
      })}
    </div>
  </div>
)
