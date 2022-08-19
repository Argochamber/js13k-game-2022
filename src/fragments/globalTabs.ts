import { html } from '../lib'

export const TABS = ['islands', 'incursions', 'research'] as const

export type Tab = typeof TABS[number]

export const globalTabs = (tab: Tab | string) => html`
  <div
    style="${`
      border-bottom: 1px solid gray;
    `}"
  >
    <div>Global View</div>
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
