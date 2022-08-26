import { Game } from '../Game'
import { h } from '../ui'
import { Buildings } from '../views/Buildings'
import { ColorPicker } from '../views/ColorPicker'
import { Dashboard } from '../views/Dashboard'
import { Islands } from '../views/Islands'
import { GlobalTabs } from './GlobalTabs'
import { IslandsTab } from './IslandTabs'
import { Island } from '../Island'

type Props = { game: Game }

const ROUTES = {
  island: Dashboard,
  islands: Islands,
  incursions: null,
  buildings: Buildings,
  research: null,
}

const TabRoutes = ({ game }: Props) => {
  if (DEVELOPMENT) {
    if ((game.tab as any) === 'colors.dev') {
      return <ColorPicker />
    }
  }
  const C = ROUTES[game.tab]
  if (C != null) {
    return <C game={game} />
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
      The {game.name} empire <span style={{ color: 'darkgray' }}>{Island.getIsland(game.selected[0], game.selected[1]).name}</span> <span style={{ color: 'gray' }}>{game.souls} souls</span>
      <hr />
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
