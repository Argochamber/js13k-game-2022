import _p from './permutations.txt'

class Grad {
  constructor(public x: number, public y: number, public z: number) {}
  dot2(x: number, y: number) {
    return this.x * x + this.y * y
  }
  dot3(x: number, y: number, z: number) {
    return this.x * x + this.y * y + this.z * z
  }
}
const grad3 = [
  new Grad(1, 1, 0),
  new Grad(-1, 1, 0),
  new Grad(1, -1, 0),
  new Grad(-1, -1, 0),
  new Grad(1, 0, 1),
  new Grad(-1, 0, 1),
  new Grad(1, 0, -1),
  new Grad(-1, 0, -1),
  new Grad(0, 1, 1),
  new Grad(0, -1, 1),
  new Grad(0, 1, -1),
  new Grad(0, -1, -1),
]
const p = [...atob(_p)].map(_ => _.charCodeAt(0))
const perm = new Array(512)
const gradP = new Array(512)
const seed = (seed: number) => {
  if (seed > 0 && seed < 1) {
    seed *= 65536
  }
  seed = Math.floor(seed)
  if (seed < 256) {
    seed |= seed << 8
  }
  for (let i = 0; i < 256; i++) {
    let v
    if (i & 1) {
      v = p[i]! ^ (seed & 255)
    } else {
      v = p[i]! ^ ((seed >> 8) & 255)
    }
    perm[i] = perm[i + 256] = v
    gradP[i] = gradP[i + 256] = grad3[v % 12]
  }
}
seed(0)

const F2 = 0.5 * (Math.sqrt(3) - 1)
const G2 = (3 - Math.sqrt(3)) / 6

export function simplex(x: number, y: number) {
  let n0, n1, n2 // Noise contributions from the three corners
  // Skew the input space to determine which simplex cell we're in
  let s = (x + y) * F2 // Hairy factor for 2D
  let i = Math.floor(x + s)
  let j = Math.floor(y + s)
  let t = (i + j) * G2
  let x0 = x - i + t // The x,y distances from the cell origin, unskewed.
  let y0 = y - j + t
  // For the 2D case, the simplex shape is an equilateral triangle.
  // Determine which simplex we are in.
  let i1, j1 // Offsets for second (middle) corner of simplex in (i,j) coords
  if (x0 > y0) {
    // lower triangle, XY order: (0,0)->(1,0)->(1,1)
    i1 = 1
    j1 = 0
  } else {
    // upper triangle, YX order: (0,0)->(0,1)->(1,1)
    i1 = 0
    j1 = 1
  }
  // A step of (1,0) in (i,j) means a step of (1-c,-c) in (x,y), and
  // a step of (0,1) in (i,j) means a step of (-c,1-c) in (x,y), where
  // c = (3-sqrt(3))/6
  let x1 = x0 - i1 + G2 // Offsets for middle corner in (x,y) unskewed coords
  let y1 = y0 - j1 + G2
  let x2 = x0 - 1 + 2 * G2 // Offsets for last corner in (x,y) unskewed coords
  let y2 = y0 - 1 + 2 * G2
  // Work out the hashed gradient indices of the three simplex corners
  i &= 255
  j &= 255
  let gi0 = gradP[i + perm[j]]
  let gi1 = gradP[i + i1 + perm[j + j1]]
  let gi2 = gradP[i + 1 + perm[j + 1]]
  // Calculate the contribution from the three corners
  let t0 = 0.5 - x0 * x0 - y0 * y0
  if (t0 < 0) {
    n0 = 0
  } else {
    t0 *= t0
    n0 = t0 * t0 * gi0.dot2(x0, y0) // (x,y) of grad3 used for 2D gradient
  }
  let t1 = 0.5 - x1 * x1 - y1 * y1
  if (t1 < 0) {
    n1 = 0
  } else {
    t1 *= t1
    n1 = t1 * t1 * gi1.dot2(x1, y1)
  }
  let t2 = 0.5 - x2 * x2 - y2 * y2
  if (t2 < 0) {
    n2 = 0
  } else {
    t2 *= t2
    n2 = t2 * t2 * gi2.dot2(x2, y2)
  }
  // Add contributions from each corner to get the final noise value.
  // The result is scaled to return values in the interval [-1,1].
  return 70 * (n0 + n1 + n2)
}
