import { h } from '../ui'

type Props = { onLogin: (value: string) => void }

export const Login = ({ onLogin }: Props) => (
  <div>
    <p>Looks like you have no empires here...</p>
    <div>
      How would you like to name your empire?
      <input id="n" />
    </div>
    <hr />
    <div style={{ width: '100%' }}>
      <button
        onClick={() =>
          onLogin((document.getElementById('n') as HTMLInputElement)!.value)
        }
        style={{ width: '100%' }}
      >
        Create Empire
      </button>
    </div>
  </div>
)
