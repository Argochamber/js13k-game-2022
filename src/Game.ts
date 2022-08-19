import { globalTabs, Tab as GlobalTab } from './fragments/globalTabs'
import { islandsTab, Tab as IslandsTab, TABS } from './fragments/islandTabs'
import { Island } from './Island'
import { html, store } from './lib'
import { render } from './ui'
import { dashboard } from './views/dashboard'

export type Tab = GlobalTab | IslandsTab

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
    game.tab = TABS[0]
    const free = Island.getFree()
    game.selected[0] = free.x
    game.selected[1] = free.y
    ;(window as any).game = game
    return game
  }
  selected: [number, number] = [0, 0]
  get name() {
    return store.get<string>('empire.name') ?? ''
  }
  get tab(): Tab {
    return store.get<Tab>('game.tab') ?? TABS[0]
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
          ${islandsTab(this.tab)}
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
          ${globalTabs(this.tab)}
        </div>
      </div>
    `
  }

  goToTab(tab: Tab) {
    this.tab = tab
    render(this.render())
  }

  // Internal use, the tab content fragment.
  private renderTabContent(): string {
    switch (this.tab) {
      case TABS[0]:
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
