import { html } from './lib'
import { simplex } from './noise'

document.body.innerHTML = html`
  <div>
    Hello World!
    <div>
      ${[...Array(100).keys()]
        .map(
          row => html`
            <div style="line-height: 0">
              ${[...Array(100).keys()]
                .map(
                  col => html`
                    <div
                      style="${`
                    display: inline-block;
                    width: 4px;
                    height: 4px;
                    padding: 0;
                    margin: 0;
                    line-height: 0;
                    background-color: rgb(${simplex(row, col) * 255}, 0, 0);
                  `}"
                    >
                      &nbsp;
                    </div>
                  `
                )
                .join('')}
            </div>
          `
        )
        .join('')}
    </div>
  </div>
`
