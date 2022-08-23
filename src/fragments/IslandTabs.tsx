import { Game } from '../Game'
import { h } from '../ui'

export const TABS = ['island', 'buildings'] as const

export type Tab = typeof TABS[number]

type Props = { tab: Tab | string; game: Game }

export const IslandsTab = ({ game, tab }: Props) => (
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
        const active = _ === tab
        return (
          <button
            onClick={
              active
                ? () => {}
                : () => {
                    game.tab = tab as Tab
                  }
            }
            className={active ? 'btn-disabled' : ''}
          >
            {_}
          </button>
        )
      })}
    </div>
  </div>
)
