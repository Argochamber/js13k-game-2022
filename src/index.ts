import { $e, $r, $u, html } from './lib'

const dashboard = () => {
  $e('views', _ => {
    _.innerHTML = html`<h1>Main Menu!</h1>`
  })
}

const tryGoDashboard = () => {
  $e('e-name', (_: HTMLInputElement) => {
    if (_.value.trim() == '') {
      alert('Empire name cannot be empty.')
    } else {
      $u('empire.name', _.value.trim())
      dashboard()
    }
  })
}

$e('root', _ => {
  _.style.fontFamily = 'sans'
  _.innerHTML = html`
    <div>
      <h1>Necrium <small>prototype</small></h1>
      <div id="views"></div>
    </div>
  `
  if ($r('empire.name')) {
    dashboard()
  } else {
    $e('views', _ => {
      _.innerHTML = html`
        <div>
          Enter a name for your empire:
          <input type="text" placeholder="Hades" id="e-name" />
          <button onclick="${tryGoDashboard.name}()">Accept</button>
        </div>
      `
    })
  }
})
