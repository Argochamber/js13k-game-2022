import { init, GameLoop, Sprite } from 'kontra'

const Let = <T, R>(a: T, b: (t: T) => R) => b(a)

Let(document.getElementById('root').style, _ => {
  _.border = '1px solid black'
  _.backgroundColor = 'gray'
})

const { canvas } = init()

const sprites = [
  ...[...Array(20).keys()].map(k => ({
    x: k * 41,
    y: 80,
    color: 'red',
    width: 20,
    height: 40,
    dx: 2,
  })),
  ...[...Array(20).keys()].map(k => ({
    x: k * 41,
    y: 120,
    color: 'blue',
    width: 20,
    height: 40,
    dx: 4,
  })),
  ...[...Array(20).keys()].map(k => ({
    x: k * 41,
    y: 160,
    color: 'green',
    width: 20,
    height: 40,
    dx: 8,
  })),
].map(Sprite)

GameLoop({
  update() {
    sprites.forEach(s => {
      if (s.x > canvas.width) {
        s.x = -s.width
      }
      s.update()
    })
  },
  render() {
    sprites.forEach(s => s.render())
  },
}).start()
