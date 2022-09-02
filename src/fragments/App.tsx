import { Game } from '../Game'
import { state, h } from '../ui'
import { GameView } from './GameView'
import { Login } from './Login'

// Try recover from local storage.
let game = state(Game.recover())

const createEmpire = (value: string) => {
  game.value = Game.create(value.toUpperCase())
}

export const App = () => {
  if (!game.value?.running) {
    game.value?.start()
  }
  if (game.value == null) {
    return <Login onLogin={createEmpire} />
  } else {
    return <GameView game={game.value} />
  }
}
