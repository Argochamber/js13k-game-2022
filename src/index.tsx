import { App } from './fragments/App'
import { h, render } from './ui'

function reset() {
  localStorage.clear()
  location.reload()
}

const Dev = () => (
  <div>
    <button onClick={reset} style={{ position: 'fixed', opacity: 0.5 }}>
      Reset All
    </button>
    <div
      id="app"
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <App />
    </div>
  </div>
)

render(Dev)
