import node_resolve from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'
import ts from '@rollup/plugin-typescript'
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'
import copy from 'rollup-plugin-copy'
import { uglify } from 'rollup-plugin-uglify'
import html from 'rollup-plugin-minify-html-literals'
import { string } from 'rollup-plugin-string'

const DIST_FOLDER = './dist'
const WATCH = process.env.ROLLUP_WATCH
  ? [
      serve({ contentBase: DIST_FOLDER, port: 8080 }),
      livereload({ watch: DIST_FOLDER }),
    ]
  : []

export default {
  input: './src/index.ts',
  output: {
    dir: DIST_FOLDER,
  },
  watch: {
    include: 'src/**',
  },
  plugins: [
    node_resolve(),
    string({
      include: '**/*.txt',
    }),
    babel({
      comments: false,
    }),
    ts(),
    copy({
      targets: [{ src: 'static/**/*', dest: 'dist' }],
    }),
    uglify({
      output: {
        comments: 'none',
      },
    }),
    html(),
    ...WATCH,
  ],
}
