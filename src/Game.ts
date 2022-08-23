import { Tab as GlobalTab } from './fragments/GlobalTabs'
import { Tab as IslandsTab, TABS } from './fragments/IslandTabs'
import { Island } from './Island'
import { store } from './lib'

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
   * Attempts to recover the game state from store.
   */
  static recover(): Game | null {
    if (store.hasData()) {
      return new Game()
    }
    return null
  }
}
