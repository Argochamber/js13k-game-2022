import { Game } from '../Game'
import { Island } from '../Island'
import { h } from '../ui'

type Props = { island: Island; game: Game }

export const IslandListItem = ({ island, game }: Props) => (
  <div>
    <button
      className={'island'}
      onClick={() => {
        game.selectIsland(island.x, island.y)
      }}
    >
      <img
        src={
          'https://64.media.tumblr.com/12aec2f22e15922736a3f0b7f9ed6987/tumblr_oeyhctM7Kn1utamaho1_540.png'
        }
      />
      {island.name}{' '}
      <span style={{ color: 'gray' }}>Level: {island.buildings.hq}</span>
      <hr />
    </button>
    <p />
  </div>
)
