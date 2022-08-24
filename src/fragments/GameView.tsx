import { Game } from '../Game'
import { h } from '../ui'
import { Dashboard } from '../views/Dashboard'
import { GlobalTabs } from './GlobalTabs'
import { IslandsTab } from './IslandTabs'

type Props = { game: Game }

const TabRoutes = ({ game }: Props) => {
  switch (game.tab) {
    case 'island':
      return <Dashboard game={game} />
  }
  return null
}

/**
 * The central game's view (With tabs).
 */
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
      <IslandsTab game={game} />
    </div>
    <div style={{ flex: 1 }}>
      <TabRoutes game={game} />
    </div>
    <div
      style={{
        borderLeft: '1px solid gray',
        paddingLeft: '1rem',
        marginLeft: '1rem',
        marginRight: '1rem',
      }}
    >
      <GlobalTabs game={game} />
    </div>
  </div>
)
