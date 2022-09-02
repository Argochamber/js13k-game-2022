import { ReactNode } from 'react'
import { $ } from '../sprites'
import { h, state } from '../ui'
import './Toast.css'

type Props = { children: ReactNode }

const images = state<{ left?: string; center?: string; right?: string }>({})

$`
  *dark 2 0 d 0 0
  *dark 2 0 d 0 64
  *flesh 2 0 a 0.5 d 0 0
  *flesh 2 0 a 0.5 d 0 64
  *dark 2 1 d 0 0
  *dark 2 1 r 180 f d 0 64
`.then(s => (images.value = { ...images.value, left: s.data }))

$`
  *dark 2 0 d 0 0
  *dark 2 0 d 0 64
  *flesh 2 0 a 0.5 d 0 0
  *flesh 2 0 a 0.5 d 0 64
  *dark 2 1 r 180 d 0 64
  *dark 2 1 f d 0 0
`.then(s => (images.value = { ...images.value, right: s.data }))

$`
*dark 2 0 d 0 0
*dark 2 0 d 0 64
*dark 2 0 d 64 0
*dark 2 0 d 64 64
*flesh 2 0 a 0.5 d 0 0
*flesh 2 0 a 0.5 d 0 64
*flesh 2 0 a 0.5 d 64 0
*flesh 2 0 a 0.5 d 64 64
*dark 0 2 f r -90 d 0 -5
*dark 0 2 r -90 f d 64 -32
*dark 0 2 f r -90 d 0 94
*dark 0 2 r -90 f d 64 70
`.then(s => (images.value = { ...images.value, center: s.data }))

export const Toast = ({ children }: Props) => (
  <div className="toast flex">
    <div
      className="half"
      style={{ backgroundImage: `url(${images.value.left})` }}
    >
      {' '}
    </div>
    <div
      className="wide"
      style={{ backgroundImage: `url(${images.value.center})` }}
    >
      {children}
    </div>
    <div
      className="half"
      style={{ backgroundImage: `url(${images.value.right})` }}
    >
      {' '}
    </div>
  </div>
)
