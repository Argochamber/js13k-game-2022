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
import css from 'rollup-plugin-import-css'
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
        add('bundle.css'),
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

function getPlugins() {
  const shared = [
    node_resolve(),
    replace({
      DEVELOPMENT,
    }),
    string({
      include: '**/*.txt',
    }),
    css({
      minify: !DEVELOPMENT,
    }),
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
