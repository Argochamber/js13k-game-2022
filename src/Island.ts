import { Game } from './Game'
import { invLog, rint, rName, store } from './lib'
import { simplex } from './noise'

const ISLAND_MANIFEST_STORAGE_KEY = 'game.islands'

export type IslandManifest = Record<`game.islands[${number},${number}]`, true>

export interface IslandInfo {
  name: string
  owner: string | null
  buildings: {
    hq: number
    altar: number
    ritual: number
    soulgate: number
    tartarus: number
  }
  units: {
    revenant: number
    acolyte: number
    titan: number
  }
  queue: {
    /** If value is null, no upgrades. If has value it states when started. */
    upgrade: {
      hq: null | Date
      altar: null | Date
      ritual: null | Date
      soulGate: null | Date
      tartarus: null | Date
    }
    /** If queue > 0, check out if lastProduced is older than now + production time. */
    produce: {
      revenant: { queue: number; lastProduced: Date }
      acolyte: { queue: number; lastProduced: Date }
      titan: { queue: number; lastProduced: Date }
    }
  }
}

/**
 * Island descriptor.
 */
export class Island<_Hydrated extends boolean = false> implements IslandInfo {
  constructor(readonly x: number, readonly y: number) {
    this.name = rName()
  }

  /**
   * Generates a new island.
   * @returns generated island
   */
  static getFree(): Island {
    const islands = store.get<IslandManifest>(ISLAND_MANIFEST_STORAGE_KEY) ?? {}
    for (let r = 0; ; r++) {
      for (let i = 0; i < rint(0, 50); i++) {
        const x = rint(-r, r)
        const y = rint(-r, r)
        if (`game.islands[${x},${y}]` in islands) {
          continue
        }
        return new Island(x, y).hydrate()
      }
    }
  }

  /**
   * Returns the islands owned by the given player.
   * @param owner
   * @returns islands owned by this player
   */
  static getIslands(owner: String) {
    const manifest =
      store.get<IslandManifest>(ISLAND_MANIFEST_STORAGE_KEY) ?? {}
    return Object.keys(manifest)
      .map(key => {
        const [, sx, sy] = key.match(/game\.islands\[(-?\d+),(-?\d+)\]/) ?? []
        const x = Number(sx),
          y = Number(sy)
        return new Island(x, y).hydrate()
      })
      .filter(island => {
        return island.owner === owner
      })
  }

  /**
   * Removes the island from local storage.
   */
  remove() {
    // Recover islands manifest.
    const manifest = store.get<IslandManifest>(ISLAND_MANIFEST_STORAGE_KEY)
    if (manifest == null) return
    delete manifest[this.key]
    // Updates the manifest
    store.set(ISLAND_MANIFEST_STORAGE_KEY, manifest)
  }

  name = 'Island'
  owner: string | null = null
  buildings = {
    hq: 0,
    altar: 0,
    ritual: 0,
    soulgate: 0,
    tartarus: 0,
  }
  units = {
    revenant: 0,
    acolyte: 0,
    titan: 0,
  }
  queue = {
    /** If value is null, no upgrades. If has value it states when started. */
    upgrade: {
      hq: null as null | Date,
      altar: null as null | Date,
      ritual: null as null | Date,
      soulGate: null as null | Date,
      tartarus: null as null | Date,
    },
    /** If queue > 0, check out if lastProduced is older than now + production time. */
    produce: {
      revenant: { queue: 0, lastProduced: new Date(0) },
      acolyte: { queue: 0, lastProduced: new Date(0) },
      titan: { queue: 0, lastProduced: new Date(0) },
    },
  }
  get seed() {
    return simplex(this.x, this.y)
  }

  // Unit production cost per level and type.
  productionCost(unit: keyof typeof this.queue.produce) {
    const lvl = this.buildings.altar
    const game = (window as unknown as { game: Game }).game
    switch (unit) {
      case 'revenant':
        return {
          time: invLog(lvl) * 1000,
          souls: (game.research.revenant + 10) * 10,
        }
      case 'acolyte':
        return {
          time: invLog(lvl) * 10000,
          souls: (game.research.acolyte + 10) * 20,
        }
      case 'titan':
        return {
          time: invLog(lvl) * 100000,
          souls: (game.research.titan + 10) * 30,
        }
    }
  }

  // Building upgrade cost per level. All cost the same amount per level.
  upgradeCost(level: number) {
    return {
      time: (level + 1) * Math.PI * 1000,
      souls: (level + 1) * Math.E * 100,
    }
  }

  // Storage key.
  get key(): `game.islands[${number},${number}]` {
    return `game.islands[${this.x},${this.y}]`
  }

  /** Stores this to local. */
  store() {
    console.log(this.key, this)
    store.set(this.key, this)
    const manifest =
      store.get<IslandManifest>(ISLAND_MANIFEST_STORAGE_KEY) ?? {}
    if (this.key in manifest) return
    manifest[this.key] = true
    store.set(ISLAND_MANIFEST_STORAGE_KEY, manifest)
  }

  /** Recovers state from the local storage based on location. */
  hydrate(): Island<true> {
    const info = store.get<IslandInfo>(this.key)
    if (info != null) {
      this.buildings = info.buildings
      this.name = info.name
      this.owner = info.owner
      this.queue = info.queue
      this.units = info.units
    }
    return this
  }
}
