import { Game } from './Game'
import { $, html } from './lib'
import { render } from './ui'

// Try recover from local storage.
let game = Game.recover()

const createEmpire = () =>
  $<HTMLInputElement, void>('#n', ([_]) => {
    game = Game.create(_?.value.toUpperCase() ?? '<ERROR>')
    render(app())
  })

const login = () => html`
  <div>
    <p>Looks like you have no empires here...</p>
    <div>
      How would you like to name your empire?
      <input id="n" />
    </div>
    <hr />
    <div style="width: 100%">
      <button onclick="${createEmpire.name}()" style="width: 100%;">
        Create Empire
      </button>
    </div>
  </div>
`

const app = () => {
  if (game == null) {
    return login()
  } else {
    return game.render()
  }
}

render(app())
