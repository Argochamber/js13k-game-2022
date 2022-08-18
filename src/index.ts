import { $ } from './lib'

const test = (a: string) => /*html*/ `<div>${a}</div>`

$(document.getElementById('root'), _ => {
  _.innerHTML = /*html*/ `
    <div>
      <h1>Hello <strong>World</strong>!</h1>
      <p>
        Test ${test('me')}
      </p>
    </div>
  `
})
