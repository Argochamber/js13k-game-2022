import node_resolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import ts from "@rollup/plugin-typescript";
import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";
import copy from "rollup-plugin-copy";import strip from '@rollup/plugin-strip';

const DIST_FOLDER = "./dist";
const WATCH = process.env.ROLLUP_WATCH
  ? [
      serve({ contentBase: DIST_FOLDER, port: 8080 }),
      livereload({ watch: DIST_FOLDER }),
    ]
  : [];

export default {
  input: "./src/index.ts",
  output: {
    dir: DIST_FOLDER,
  },
  watch: {
    include: "src/**",
  },
  plugins: [
    node_resolve(),
    babel({
      extensions: [".ts", ".js", ".mjs", ".cjs"],
      minified: true,
      comments: false,
    }),
    ts(),
    copy({
      targets: [{ src: "static/**/*", dest: "dist" }],
    }),
    strip({
      functions: ['html']
    }),
    ...WATCH,
  ],
};
