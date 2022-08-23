import { Game } from '../Game'
import { h } from '../ui'
import { IslandsTab } from './IslandTabs'

type Props = { game: Game }

export const GameView = ({ game }: Props) => (
  <div
    style={{
      display: 'flex',
      width: 'calc(100% - 1rem)',
      height: 'calc(100% - 1rem)',
    }}
  >
    <div
      style={{
        borderRight: '1px solid gray',
        paddingRight: '1rem',
        marginRight: '1rem',
        marginLeft: '1rem',
      }}
    >
      <IslandsTab game={game} tab={game.tab} />
      {game.souls}
    </div>
    <div style={{ flex: 1 }}>this.renderTabContent()</div>
    <div
      style={{
        borderLeft: '1px solid gray',
        paddingLeft: '1rem',
        marginLeft: '1rem',
        marginRight: '1rem',
      }}
    >
      globalTabs(this.tab)
    </div>
  </div>
)
