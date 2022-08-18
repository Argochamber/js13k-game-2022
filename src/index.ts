import { $, store, html } from './lib'

const getAge = () => {
  const origin = store.get<number>('empire.age')
  const today = Date.now()
  const age = (today - origin) / 24000
  const day = Math.floor(age)
  return {
    age,
    day,
    hour: Math.floor((age - day) * 24),
  }
}

const uClock = () => {
  const { day, hour } = getAge()
  $('#age', ([_]) => {
    _.innerHTML = html`Your empire is ${day} day(s) and ${hour} hour(s) old`
  })
}

const dashboard = () => {
  const name = store.get<string>('empire.name')
  const clk = setInterval(uClock, 1000)
  $('#views', ([_]) => {
    _.innerHTML = html`
      <h2>${name}</h2>
      <p id="age"></p>
    `
    uClock()
  })
}

const tryGoDashboard = () => {
  $<HTMLInputElement, void>('#e-name', ([_]) => {
    if (_.value.trim() == '') {
      alert('Empire name cannot be empty.')
    } else {
      // INITIALIZE THE DATABASE
      store.set('empire.name', _.value.trim())
      store.set('empire.age', Date.now())
      store.set('empire.alma', 1000)
      dashboard()
    }
  })
}

const rst = () => {
  localStorage.clear()
  location.reload()
}

$('#root', ([_]) => {
  _.style.fontFamily = 'sans'
  _.style.padding = '1rem'
  _.style.display = 'flex'
  _.innerHTML = html`
    <div>
      <h1>
        Necrium
        <small>prototype <button onclick="${rst.name}()">reset</button></small>
      </h1>
      <div id="views"></div>
    </div>
  `
  if (store.hasData()) {
    dashboard()
  } else {
    $('#views', ([_]) => {
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
