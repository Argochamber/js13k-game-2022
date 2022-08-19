import { html } from './lib'

export const render = (children: string) => {
  document.body.innerHTML = html`
    <button
      style="${`
        position: fixed;
        opacity: 0.5;
      `}"
      onclick="(localStorage.clear(),location.reload())"
    >
      Reset
    </button>
    <div
      id="app"
      style="${`
        width: 100vw;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center
      `}"
    >
      ${children}
    </div>
  `
}

export const Component = (target: CustomElementConstructor) => {
  const name = target.name
    .replace(/[A-Z]/g, _ => `-${_.toLowerCase()}`)
    .replace(/^-/, '')
  customElements.define(name, target)
}
