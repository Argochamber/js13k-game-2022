import { html } from '../lib'

export const TABS = ['status', 'resources', 'factories'] as const

export type Tab = typeof TABS[number]

export const islandsTab = (tab: Tab | string) => html`
  <div
    style="${`
      border-bottom: 1px solid gray;
    `}"
  >
    <div>Current Island</div>
    <hr />
    <div
      style="${`
        display: flex;
        flex-direction: column;
      `}"
    >
      ${TABS.map(_ => {
        const active = _ === tab
        return html`
          <button
            ${active ? '' : `onclick="game.goToTab('${_}')"`}
            class="${active ? 'btn-disabled' : ''}"
          >
            ${_}
          </button>
        `
      }).join('')}
    </div>
  </div>
`
