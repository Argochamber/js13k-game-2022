export const h = <T extends Record<string, any>, U extends any[]>(
  elem: string | ((props: {}) => Element),
  props: T,
  ...children: U
) => {
  if (typeof elem === 'function') {
    return elem({ ...props, children })
  }
  const o = document.createElement(elem)
  for (const [k, v] of Object.entries(props ?? {})) {
    switch (k) {
      case 'className':
        o.className = v
        continue
      case 'onClick':
        o.onclick = v
        continue
      case 'style':
        for (const key in v) {
          o.style[key as any] = v[key]
        }
        continue
    }
    o.setAttribute(k, v)
  }
  for (const child of children) {
    if (child instanceof Array) o.append(...child)
    else o.append(child)
  }
  return o
}

export type Component<T> = (props: T) => JSX.Element | string | null;

let target: Component<void> = () => null

/**
 * Set the target render component and create the first update.
 */
export const render = (_target: Component<void>) => {
  target = _target
  update()
}

/**
 * Force update, if side effects.
 */
export const update = () => {
  document.body.replaceChildren(target() as any)
}

export class Atom<T> {
  constructor(private _value: T) {}
  get value(): T {
    return this._value
  }
  set value(value: T) {
    this._value = value
    update()
  }
}

/**
 * Mutable state atom that causes cascade render on update.
 */
export const state = <T>(init: T) => new Atom(init)
