import { Tab as GlobalTab } from './fragments/GlobalTabs'
import { Tab as IslandsTab, TABS } from './fragments/IslandTabs'
import { Island } from './Island'
import { pairs, store } from './lib'
import { update } from './ui'

export type Tab = GlobalTab | IslandsTab

export interface Research {
  revenant: number
  acolyte: number
  titan: number
}

/**
 * Main game state class.
 */
export class Game {
  constructor() {
    ;(window as unknown as { game: Game }).game = this
  }
  /**
   * Creates and stores the game state.
   */
  static create(name: string) {
    store.set('empire.name', name)
    const game = new Game()
    game.souls = 1000
    game.tab = TABS[0]
    game.research = {
      titan: 0,
      acolyte: 0,
      revenant: 0,
    }

    const free = Island.getFree()
    free.owner = name
    game.selected[0] = free.x
    game.selected[1] = free.y
    free.store() // TODO: decide whether this is called separatedly or when a new island is generated

    for (let i = 0; i < 10; i++) {
      const another = Island.getFree()
      another.owner = name
      another.store()
    }

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
    update()
  }
  get souls() {
    return store.get<number>('empire.souls') ?? 0
  }
  set souls(souls: number) {
    store.set('empire.souls', souls)
    update()
  }
  get research(): Research {
    return store.get<Research>('empire.research')!
  }
  set research(research: Research) {
    store.set('empire.research', research)
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

  /**
   * Selects the given island and changes to the island overview tab.
   */
  selectIsland(x: number, y: number) {
    this.selected[0] = x
    this.selected[1] = y
    this.tab = TABS[0]
  }

  get island() {
    return new Island(...this.selected).hydrate()
  }

  private ev: NodeJS.Timer | null = null

  get running() {
    return this.ev != null
  }

  /**
   * # EV Start
   *
   * Starts the game event loop.
   *
   * Islands are lazy updated when used.
   *
   * Each game tick is roughly one second.
   */
  start() {
    // Process production queues:
    this.ev = setInterval(() => {
      const now = new Date()
      const island = this.island
      for (const [k, v] of pairs(this.island.queue.produce)) {
        if (v.queue <= 0) continue
        const cost = island.productionCost(k)
        const next = new Date(v.lastProduced.getTime() + cost.time)
        if (next < now) {
          island.queue.produce[k].queue -= 1
          island.queue.produce[k].lastProduced = now
          island.units[k] += 1
        }
      }
      const islands = Island.getIslands(this.name)
      this.souls += Math.floor(
        islands.reduce((a, b) => a + b.buildings.soulgate + 1, 0)
      )
      island.store()
      update()
    }, 1000)
  }
}
