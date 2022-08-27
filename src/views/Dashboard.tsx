import { Game } from '../Game'
import { Island } from '../Island'
import { h } from '../ui'

type Props = { game: Game }

export const Dashboard = ({ game }: Props) => {
  const island = Island.getIsland(game.selected[0], game.selected[1])
  return (
    <div>
      <div>
        <div>{island.name} overview</div>
        <div>
          <h4>Buildings</h4>
          <div>Headquarters: {island.buildings.hq}</div>
          <div>Resurrection Altar: {island.buildings.altar}</div>
          <div>Soul Gate: {island.buildings.soulgate}</div>
          <div>Ritual Mound: {island.buildings.ritual}</div>
          <div>Tartarus Gate: {island.buildings.tartarus}</div>
          <hr />
        </div>
      </div>
    </div>
  )
}
