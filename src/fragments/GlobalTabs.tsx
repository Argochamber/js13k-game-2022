import { h } from '../ui'

export const TABS = ['islands', 'incursions', 'research'] as const

export type Tab = typeof TABS[number]

export const GlobalTabs = (tab: Tab | string) => (
  <div
    style={{
      borderBottom: '1px solid gray',
    }}
  >
    <div>Global View</div>
    <hr />
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      $
      {TABS.map(_ => {
        const active = _ === tab
        return (
          <button
            onClick={active ? () => {} : () => {}}
            className={active ? 'btn-disabled' : ''}
          >
            {_}
          </button>
        )
      }).join('')}
    </div>
  </div>
)
