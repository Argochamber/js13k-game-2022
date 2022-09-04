import { Game } from '../Game'
import { h } from '../ui'

type Props = { game: Game }

export const Exploration = ({ game }: Props) => {
  return (
    <div>
      <div>
        Expeditions  <span style={{ color: 'darkgray' }}>{game.expeditions.length} in course</span> <span style={{ color: 'gray' }}>0 revenants available</span>
        <hr/>
        <button
          style={{ width: '100%' }}
          onClick={() => { game.launchExpedition(0, 0) }}
          >
            Launch new expedition
          </button>
        {game.expeditions.map(expedition => ( // TODO: make fragment
          <div>
            {Math.round((expedition.time.getTime() - Date.now()) / 1000)}
          </div>
        ))}
      </div>
      <div>
        <p/>
        Discoveries <span style={{ color: 'gray' }}>0 islands</span>
        <hr/>
      </div>
    </div>
  )
}