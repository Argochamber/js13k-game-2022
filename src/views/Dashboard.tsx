import { Game } from '../Game'
import { Island } from '../Island'
import { h } from '../ui'

export const Dashboard = (game: Game) => {
  const island = Island.getIsland(game.selected[0], game.selected[1])
  return (
    <div>
      The ${game.name} empire
      <span style={{ color: 'gray' }}>${game.souls} souls</span>
      <hr />
      <div>
        <div>${island.name} overview</div>
        <div>Soul Gate level: ${island.soulGate}</div>
      </div>
    </div>
  )
}
