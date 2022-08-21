import { Game } from '../Game'
import { Island } from '../Island'
import { html } from '../lib'

const render = (game: Game, island: Island | undefined) => {
  return html`
    <button class="island" onclick="game.selected[0]=${island ? island.x : 0}; game.selected[1]=${island ? island.y : 0}; game.goToTab('island')">
      > ${island ? island.name : 'undefined'}
    </button>
  `
} // TODO: add function to select an island

export const islands = (game: Game) => {
  const islands: Array<Island> = Island.getIslands(game.name)
  return html`
    <div>
      ${game.name} empire dominion
      <span style="color: gray;">${islands.length} islands</span>
      <hr />
      <div>
        ${islands.map(island => { return render(game, island) }).join('')}
      </div>
    </div>
  `
}