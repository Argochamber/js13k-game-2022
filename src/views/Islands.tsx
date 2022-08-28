import { Game } from '../Game'
import { Island } from '../Island'
import { IslandListItem } from '../fragments/IslandListItem'
import { Atom, h, state } from '../ui'

type Props = { game: Game }

const images: Record<number, Atom<string>> = {}

export const Islands = ({ game }: Props) => {
  const islands: Array<Island> = Island.getIslands(game.name)
  for (const island of islands) {
    if (images[island.seed] == null) {
      images[island.seed] = state('')
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
