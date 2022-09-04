import { Game } from '../Game'
import { Island } from '../Island'
import { h } from '../ui'

type Props = { island: Island; game: Game; image: string }

export const IslandListItem = ({ image, island, game }: Props) => (
  <div>
    <div
      className="hover pointer"
      onClick={() => {
        game.select(island.x, island.y)
      }}
    >
      <img className="sprite" src={image} />
      {island.name}{' '}
      <span className="secondary">Level: {island.buildings.hq}</span>
      <hr />
    </div>
    <p />
  </div>
)
