import { Game } from '../Game'
import { html } from '../lib'

export const dashboard = (game: Game) => {
  return html`
    <div>
      The ${game.name} empire
      <hr />
      <p>Hello World!</p>
    </div>
  `
}
