import { Game } from '../Game'
import { Island } from '../Island'
import { h } from '../ui'

type Props = { game: Game }

export const Dashboard = ({ game }: Props) => {
  const island = Island.getIsland(game.selected[0], game.selected[1])
  return (
    <div>
      <div>{island.name} overview</div>
      <div>Soul Gate level: {island.soulGate}</div>
    </div>
  )
}
