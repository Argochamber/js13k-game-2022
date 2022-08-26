import { from64, hex2rgb, to64 } from '../lib'
import { rgb2hex, Sprite } from '../sprites'
import { Atom, h, state } from '../ui'

type Props = {}

const Input = ({ label, value }: { label: string; value: Atom<string> }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
    <span>{label}</span>
    <input
      type="color"
      value={value.value}
      onChange={(e: any) => {
        if (value.value !== e.target.value) {
          value.value = e.target.value
          requestUpdate()
        }
      }}
    />
  </div>
)

const sprite = state('sprites.png')
const colors = {
  primary: state('#ffffff'),
  secondary: state('#bfbfbf'),
  shadow: state('#535353'),
  dark: state('#090909'),
  accent1: state('#ff0000'),
  accent2: state('#00ff00'),
  accent3: state('#0000ff'),
  glint: state('#ffff00'),
}

function requestUpdate() {
  Sprite.compose(256, 256, async () => {
    const spr = await new Sprite('sprites.png')
      .colored([
        ...hex2rgb(colors.primary.value),
        ...hex2rgb(colors.secondary.value),
        ...hex2rgb(colors.shadow.value),
        ...hex2rgb(colors.dark.value),
        ...hex2rgb(colors.accent1.value),
        ...hex2rgb(colors.accent2.value),
        ...hex2rgb(colors.accent3.value),
        ...hex2rgb(colors.glint.value),
      ])
      .then(s => s.scaled(4, 4))
    if (sprite.value !== spr.data) {
      sprite.value = spr.data
    }
  })
  return null
}
requestUpdate()

function genStr() {
  return `[
  ${hex2rgb(colors.primary.value).join(', ')}, // PRIMARY
  ${hex2rgb(colors.secondary.value).join(', ')}, // SECONDARY
  ${hex2rgb(colors.shadow.value).join(', ')}, // SHADOW
  ${hex2rgb(colors.dark.value).join(', ')}, // DARK
  ${hex2rgb(colors.accent1.value).join(', ')}, // ACCENT 1
  ${hex2rgb(colors.accent2.value).join(', ')}, // ACCENT 2
  ${hex2rgb(colors.accent3.value).join(', ')}, // ACCENT 3
  ${hex2rgb(colors.glint.value).join(', ')} // GLINT
]`
}

function genBase64() {
  return to64([
    ...hex2rgb(colors.primary.value),
    ...hex2rgb(colors.secondary.value),
    ...hex2rgb(colors.shadow.value),
    ...hex2rgb(colors.dark.value),
    ...hex2rgb(colors.accent1.value),
    ...hex2rgb(colors.accent2.value),
    ...hex2rgb(colors.accent3.value),
    ...hex2rgb(colors.glint.value),
  ])
}

export const ColorPicker = ({}: Props) => (
  <div>
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-evenly',
        paddingTop: '4rem',
      }}
    >
      <div>
        <img
          style={{ width: '256px', height: '256px', border: '1px solid white' }}
          src={sprite.value}
        />
      </div>
      <div
        style={{ display: 'flex', flexDirection: 'column', maxWidth: '22rem' }}
      >
        <Input label="Primary" value={colors.primary} />
        <Input label="Secondary" value={colors.secondary} />
        <Input label="Shadow" value={colors.shadow} />
        <Input label="Dark" value={colors.dark} />
        <hr />
        <Input label="Accent 1" value={colors.accent1} />
        <Input label="Accent 2" value={colors.accent2} />
        <Input label="Accent 3" value={colors.accent3} />
        <hr />
        <Input label="Glint" value={colors.glint} />
      </div>
    </div>
    <div>
      <h3>Output</h3>
      <h4>
        Code{' '}
        <button
          onClick={() => {
            navigator.clipboard.writeText(genStr())
          }}
        >
          Copy
        </button>
      </h4>
      <code>
        <pre style={{ fontFamily: 'Silkscreen' }}>{genStr()}</pre>
      </code>
      <h4>
        Base64{' '}
        <button
          onClick={() => {
            navigator.clipboard.writeText(genBase64())
          }}
        >
          Copy
        </button>
      </h4>
      <code>
        <pre style={{ fontFamily: 'Silkscreen' }}>{genBase64()}</pre>
      </code>
      <input
        onChange={(e: any) => {
          const data = from64(e.target.value)
          let s = 0
          colors.primary.value = rgb2hex(...data.slice(s * 4, s++ * 4 + 3))
          colors.secondary.value = rgb2hex(...data.slice(s * 4, s++ * 4 + 3))
          colors.shadow.value = rgb2hex(...data.slice(s * 4, s++ * 4 + 3))
          colors.dark.value = rgb2hex(...data.slice(s * 4, s++ * 4 + 3))
          colors.accent1.value = rgb2hex(...data.slice(s * 4, s++ * 4 + 3))
          colors.accent2.value = rgb2hex(...data.slice(s * 4, s++ * 4 + 3))
          colors.accent3.value = rgb2hex(...data.slice(s * 4, s++ * 4 + 3))
          colors.glint.value = rgb2hex(...data.slice(s * 4, s++ * 4 + 3))
          requestUpdate()
        }}
      />
    </div>
  </div>
)
