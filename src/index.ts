import { html, Let } from "./lib"

Let(document.getElementById('root'), _ => {
  const what = 'DOM'
  _.innerHTML = html`
    <div>
      <h1>Hello <strong>World</strong>!</h1>
      <p>
        Raw ${what}
      </p>
    </div>
  `
})
