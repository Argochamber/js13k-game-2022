import { h } from '../ui'

export const TABS = ['island', 'buildings'] as const

export type Tab = typeof TABS[number]

export const islandsTab = (tab: Tab | string) => (
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
