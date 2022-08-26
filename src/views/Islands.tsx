import { Game } from '../Game'
import { Island } from '../Island'
import { IslandListItem } from '../fragments/IslandListItem'
import { h } from '../ui'

type Props = { game: Game }

export const Islands = ({ game }: Props) => {
  const islands: Array<Island> = Island.getIslands(game.name)
  return (
    <div>
      {islands.map(island => <IslandListItem game={game} island={island} />)}
    </div>
  )
}