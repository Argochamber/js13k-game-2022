import { Game } from '../Game'
import { h } from '../ui'

export const GameView = ({ game }: { game: Game }) => (
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
      islandsTab(this.tab)
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
