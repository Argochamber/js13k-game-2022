import { store } from './lib'
import { dashboard } from './views/dashboard'

// Available tabs.
export type Tabs = 'dashboard' | 'resources' | 'factories'

/**
 * Main game state class.
 */
export class Game {
  static create(name: string) {
    store.set('empire.name', name)
    const game = new Game()
    game.souls = 1000
    game.tab = 'dashboard'
    return game
  }
  get name() {
    return store.get<string>('empire.name') ?? ''
  }
  get tab(): Tabs {
    return store.get<Tabs>('game.tab') ?? 'dashboard'
  }
  set tab(id: Tabs) {
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
