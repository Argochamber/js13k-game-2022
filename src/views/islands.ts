import { Game } from '../Game'
import { html } from '../lib'
import { Island } from '../Island'
import { islandListItem } from '../fragments/islandListItem'

export const islands = (game: Game) => {
  const islands: Array<Island> = Island.getIslands(game.name)
  return html`
    <div>
      ${game.name} empire dominion
      <span style="color: gray;">${islands.length} islands</span>
      <hr />
      <div>
        ${islands.map(island => { return islandListItem(island) }).join('')}
      </div>
    </div>
  `
}