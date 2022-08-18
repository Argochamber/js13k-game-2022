import { html, store } from './lib'
import { render } from './ui'
import { dashboard } from './views/dashboard'

// Available tabs.
export const TABS = [
  'dashboard',
  'resources',
  'factories',
  'islands',
  'incursions',
] as const
export type Tab = typeof TABS[number]

/**
 * Main game state class.
 */
export class Game {
  /**
   * Creates and stores the game state.
   */
  static create(name: string) {
    store.set('empire.name', name)
    const game = new Game()
    game.souls = 1000
    game.tab = 'dashboard'
    ;(window as any).game = game
    return game
  }
  get name() {
    return store.get<string>('empire.name') ?? ''
  }
  get tab(): Tab {
    return store.get<Tab>('game.tab') ?? 'dashboard'
  }
  set tab(id: Tab) {
    store.set('game.tab', id)
  }
  get souls() {
    return store.get<number>('empire.souls') ?? 0
  }
  set souls(souls: number) {
    store.set('empire.souls', souls)
  }

  /**
   * Renders the whole game fragment.
   */
  render(): string {
    return html`
      <div
        style="${`
          display: flex;
          width: calc(100% - 1rem);
          height: calc(100% - 1rem);
        `}"
      >
        <div
          style="${`
            border-right: 1px solid gray;
            padding-right: 1rem;
            margin-right: 1rem;
            margin-left: 1rem;
          `}"
        >
          ${this.renderTabs()}
        </div>
        <div style="flex: 1">${this.renderTabContent()}</div>
        <div
          style="${`
            border-left: 1px solid gray;
            padding-left: 1rem;
            margin-left: 1rem;
            margin-right: 1rem;
          `}"
        >
          c
        </div>
      </div>
    `
  }

  goToTab(tab: Tab) {
    this.tab = tab
    render(this.render())
  }

  private renderTabs(): string {
    return html`
      <div
        style="${`
          border-bottom: 1px solid gray;
        `}"
      >
        <div>Options</div>
        <hr />
        <div
          style="${`
            display: flex;
            flex-direction: column;
          `}"
        >
          ${TABS.map(_ => {
            const active = _ === this.tab
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
  }

  // Internal use, the tab content fragment.
  private renderTabContent(): string {
    switch (this.tab) {
      case 'dashboard':
        return dashboard(this)
      default:
        return ''
    }
  }

  /**
   * Attempts to recover the game state from store.
   */
  static recover(): Game | null {
    if (store.hasData()) {
      return new Game()
    }
    return null
  }
}
