import { html } from '../lib'
import { Island } from '../Island'

export const islandListItem = (island: Island) => html`
  <button class="island" onclick="game.selectIsland(${island.x}, ${island.y})">
    > ${island.name}
    <div style="color: gray;">Soul gate level: ${island.soulGate}</div>
    <hr/>
    <img src="https://64.media.tumblr.com/12aec2f22e15922736a3f0b7f9ed6987/tumblr_oeyhctM7Kn1utamaho1_540.png"/>
  </button>
  <p/>
`