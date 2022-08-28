import { App } from './fragments/App'
import { h, render } from './ui'
import './styles.css'
import { loadAtlases } from './atlases'

if (DEVELOPMENT) {
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
  loadAtlases().then(() => render(Dev))
} else {
  loadAtlases().then(() => render(App))
}
