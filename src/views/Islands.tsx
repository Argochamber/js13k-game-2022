import { Game } from '../Game'
import { Island } from '../Island'
import { IslandListItem } from '../fragments/IslandListItem'
import { Atom, h, state } from '../ui'
import { $ } from '../sprites'

type Props = { game: Game }

const images: Record<number, Atom<string>> = {}

export const genIslandAvatar = (island: Island) => {
  const isl = (island.seed * 0xffffff) >> 0
  return $`*soul 1 1 f r 90 d 0 0
*soul 1 1 f d 0 64
*soul 1 1 d 64 64
*soul 1 1 r 270 d 64 0
*bone 0 0 d 32 32`.then(s =>
    s.tint(
      `rgb(${isl & 0xff}, ${(isl & 0xff) >> 16}, ${(isl & 0xff0000) >> 64})`,
      'color-dodge'
    )
  )
}

export const Islands = ({ game }: Props) => {
  const islands = Island.getIslands(game.name)
  for (const island of islands) {
    if (images[island.seed] == null) {
      images[island.seed] = state('')
      genIslandAvatar(island).then(s => (images[island.seed]!.value = s.data))
    }
  }
  return (
    <div>
      {islands.map(island => (
        <IslandListItem
          image={images[island.seed]!.value}
          game={game}
          island={island}
        />
      ))}
    </div>
  )
}
