import { Game } from '../Game'
import { h } from '../ui'

type Props = { game: Game }

export const Exploration = ({ game }: Props) => {
  return (
    <div>
      <div>
        Expeditions  <span style={{ color: 'darkgray' }}>0 in course</span> <span style={{ color: 'gray' }}>0 revenants available</span>
        <hr/>
        <button style={{ width: '100%' }}>Launch new expedition</button>
      </div>
      <div>
        <p/>
        Discoveries <span style={{ color: 'gray' }}>0 islands</span>
        <hr/>
      </div>
    </div>
  )
}