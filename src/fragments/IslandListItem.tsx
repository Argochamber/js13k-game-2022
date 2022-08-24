import { Game } from '../Game'
import { Island } from '../Island'
import { h } from '../ui'

type Props = { island: Island, game: Game }

export const IslandListItem = ({ island, game }: Props) => (
  <button>
    <div
      style={{
        color: 'gray'
      }}
    >Soul gate level: ${island.soulGate}</div>
    <hr/>
    <img src={'https://64.media.tumblr.com/12aec2f22e15922736a3f0b7f9ed6987/tumblr_oeyhctM7Kn1utamaho1_540.png'}/>
  </button>
)