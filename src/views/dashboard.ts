import { Game } from '../Game'
import { html } from '../lib'

export const dashboard = (game: Game) => {
  return html`
    <div>
      The ${game.name} empire
      <hr />
      <div>
        <div>Current soul count: ${game.souls} souls.</div>
      </div>
    </div>
  `
}
