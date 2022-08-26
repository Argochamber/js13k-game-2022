import node_resolve from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'
import ts from '@rollup/plugin-typescript'
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'
import copy from 'rollup-plugin-copy'
import { uglify } from 'rollup-plugin-uglify'
import html from 'rollup-plugin-minify-html-literals'
import { string } from 'rollup-plugin-string'
import strip from '@rollup/plugin-strip'
import replace from '@rollup/plugin-replace'
import { EasyZip as Zip } from 'easy-zip'
import path from 'path'
const fs = require('fs')
require('colors').enable()

const DEVELOPMENT = !!process.env.DEVELOPMENT
const DIST_FOLDER = './dist'
const MAX_BUNDLE_SIZE = 13_000_000

/** @returns {import('rollup').Plugin} */
function makeZip() {
  const OUTPUT_ZIP = 'nekrium.zip'
  const bundle = new Zip()
  function add(file) {
    return new Promise(r => {
      bundle.addFile(file, path.join(DIST_FOLDER, file), () => {
        r()
      })
    })
  }
  return {
    name: 'zipper',
    closeBundle() {
      Promise.all([
        add('index.js'),
        add('index.html'),
        add('sprites.png'),
        add('styles.css'),
      ]).then(() => {
        bundle.writeToFile(path.join(DIST_FOLDER, OUTPUT_ZIP), () => {
          const stats = fs.statSync(path.join(DIST_FOLDER, OUTPUT_ZIP))
          if (stats.size > MAX_BUNDLE_SIZE) {
            console.error(
              `
----------------------------------------------

               FATAL SCENARIO

      The bundle seems to outweight the
      maximum bundle size (zip) of 13kb
      by ${stats.size - MAX_BUNDLE_SIZE} bytes.

      This can cause the failure in
      participation! BE WARY OF THIS.

----------------------------------------------`.bold.red
            )
          }
        })
      })
    },
  }
}

/** @returns {import('rollup').Plugin} */
function gourmad({} = {}) {
  return {
    name: 'Gourmad',
    load(id) {
      if (id.match(/\.spr$/)) {
        const target = { w: 0, h: 0 }
        const code = fs
          .readFileSync(id)
          .toString()
          .split('\n')
          .map(line => line.trim())
          .filter(line => line.length)
          .map(line => {
            const [cmd, ...args] = line.match(/[^ ]+/g)
            switch (cmd) {
              case 'blend':
                return `ctx.globalCompositeOperation = '${args[0]}';`
              case 'get':
                return `await Promise.resolve(palette.${args[0]}.at(${args[1]}, ${args[2]}))`
              case 'fade':
                return `  .then(_=>_.faded(${args[0]}))`
              case 'draw':
                return `  .then(_=>_.draw(ctx, ${args[0]}, ${args[1]}));`
              case 'flip':
                return `  .then(_=>_.flipped())`
              case '//':
                return line
              case 'target':
                return ''
            }
            throw new SyntaxError(`\nUnexpected token at line:\n${line}`)
          })
          .join('\n  ')
        return `import { Sprite } from './sprites';
export default palette => Sprite.compose(${target.w}, ${target.h}, async ctx => {  ${code}
})`
      }
      return null
    },
  }
}

function getPlugins() {
  const shared = [
    node_resolve(),
    replace({
      DEVELOPMENT,
    }),
    string({
      include: '**/*.txt',
    }),
    gourmad(),
    ts(),
    babel({
      comments: DEVELOPMENT,
      babelHelpers: 'bundled',
    }),
    copy({
      targets: [{ src: 'static/**/*', dest: 'dist' }],
    }),
    html(),
  ]
  if (DEVELOPMENT) {
    return [
      ...shared,
      livereload({ watch: DIST_FOLDER }),
      serve({ contentBase: DIST_FOLDER, port: 8080 }),
    ]
  } else {
    return [
      ...shared,
      uglify({
        output: {
          comments: 'none',
        },
      }),
      strip({
        include: ['**/*.ts', '**/*.tsx'],
      }),
      makeZip(),
    ]
  }
}

export default {
  input: './src/index.tsx',
  output: {
    dir: DIST_FOLDER,
    sourcemap: true,
  },
  watch: {
    include: 'src/**',
  },
  plugins: getPlugins(),
}
