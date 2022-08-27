import { rint, store } from './lib'
import { simplex } from './noise'

/**
 * Island descriptor.
 */
export class Island {
  /**
   * Generates a new island.
   * @returns generated island
   */
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

  /**
   * Returns the island residing in the given coordinates.
   * @param x 
   * @param y 
   * @returns island in the given coordinates
   */
  static getIsland(x: number, y: number): Island {
    const islands = store.get<Record<string, Island>>('game.islands')
    const found = islands?.[`${x}:${y}`]
    if (found == null) {
      return new Island(x, y)
    } else {
      const island = new Island(x, y)
      island.name = found.name
      island.owner = found.owner
      island.buildings = found.buildings
      return island
    }
  }

  /**
   * Returns the islands owned by the given player.
   * @param owner 
   * @returns islands owned by this player
   */
  static getIslands(owner: String): Array<Island> {
    const islands = store.get<Record<string, Island>>('game.islands')
    return islands ? Object.values(islands).filter(island => { return island.owner === owner }) : []
  }

  /**
   * Stores the given island into local storage.
   * @param island 
   */
   static store(island: Island) {
    let islands = store.get<Record<string, Island>>('game.islands')
    if (!islands) { islands = {} } // create storage object if it doesn't exist
    islands[`${island.x}:${island.y}`] = island
    store.set('game.islands', islands) // store islands
  }

  /**
   * Removes the island in the given coordinates from local storage.
   * @param x 
   * @param y 
   */
  static remove(x: number, y: number) {
    const islands = store.get<Record<string, Island>>('game.islands')
    if (!islands) { return } // do nothing if no object is found
    delete islands[`${x}:${y}`] // delete from object
    store.set('game.islands', islands) // store islands
  }

  constructor(readonly x: number, readonly y: number) {}
  name = 'Island'
  owner: string | null = null
  buildings = {
    hq: 0,
    altar: 0,
    ritual: 0,
    soulgate: 0,
    tartarus: 0
  }
  units = {
    revenant: 0,
    acolyte: 0,
    titan: 0
  }
  get seed() {
    return simplex(this.x, this.y)
  }
}
