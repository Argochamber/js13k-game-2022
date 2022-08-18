import { Game } from '../Game'
import { html } from '../lib'

export const dashboard = (game: Game) => {
  return html`
    <div>
      The ${game.name} empire
      <hr />
      <div>
        <p>Hello World!</p>
        <p>This is your necromancy warlock</p>
      </div>
    </div>
  `
}
