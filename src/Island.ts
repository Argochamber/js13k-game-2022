import { rint, store } from './lib'
import { simplex } from './noise'

/**
 * Island descriptor.
 */
export class Island {
  static getFree(): Island {
    const islands = store.get<Record<string, Island>>('game.islands')
    for (let r = 0; ; r++) {
      for (let i = 0; i < rint(0, 50); i++) {
        const x = rint(-r, r)
        const y = rint(-r, r)
        const found = islands?.[`${x}:${y}`]
        if (found == null) {
          return this.getIsland(x, y)
        }
      }
    }
  }

  static getIsland(x: number, y: number): Island {
    const islands = store.get<Record<string, Island>>('game.islands')
    const found = islands?.[`${x}:${y}`]
    if (found == null) {
      return new Island(x, y)
    } else {
      const island = new Island(x, y)
      island.name = found.name
      island.owner = found.owner
      island.soulGate = found.soulGate
      return island
    }
  }

  static getIslands(owner: String): Array<Island> {
    const islands = store.get<Record<string, Island>>('game.islands')
    return islands ? Object.values(islands).filter(island => { return island.owner === owner }) : []
  }

  constructor(readonly x: number, readonly y: number) {}
  name = 'Island'
  owner: string | null = null
  soulGate = 0
  get seed() {
    return simplex(this.x, this.y)
  }
}
