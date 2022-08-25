import { Game } from '../Game'
import { Island } from '../Island'
import { IslandListItem } from '../fragments/IslandListItem'
import { h } from '../ui'

export const Islands = (game: Game) => {
  const islands: Array<Island> = Island.getIslands(game.name)
  return (
    <div>
      ${game.name} empire dominion
      <span style={{ color: 'gray' }}>
        ${islands.length} islands
      </span>
      <hr/>
      <div>
        ${islands.map(island => { return IslandListItem({ game, island }) }).join('')}
      </div>
    </div>
  )
}