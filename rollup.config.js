import node_resolve from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'
import ts from '@rollup/plugin-typescript'
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'
import copy from 'rollup-plugin-copy'
import replace from '@rollup/plugin-replace'
import { uglify } from 'rollup-plugin-uglify'

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
    ,
    replace({
      values: {},
    }),
    node_resolve(),
    babel(),
    ts(),
    copy({
      targets: [{ src: 'static/**/*', dest: 'dist' }],
    }),
    uglify({
      output: {
        comments: 'none',
      },
    }),
    ...WATCH,
  ],
}
