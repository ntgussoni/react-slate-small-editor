import babel from "rollup-plugin-babel";
import commonjs from "rollup-plugin-commonjs";
import external from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";
import resolve from "rollup-plugin-node-resolve";
import url from "rollup-plugin-url";
import svgr from "@svgr/rollup";
import json from "rollup-plugin-json";
import builtins from "rollup-plugin-node-builtins";

import pkg from "./package.json";

export default {
  input: "src/index.js",
  output: [
    {
      file: pkg.main,
      format: "cjs",
      sourcemap: true
    },
    {
      file: pkg.module,
      format: "es",
      sourcemap: true
    }
  ],
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {})
  ],
  plugins: [
    external(),
    postcss({
      modules: true
    }),
    url(),
    svgr(),
    babel({
      presets: [["@babel/preset-env"]],
      exclude: ["node_modules/**", "*.json"],
      plugins: ["babel-plugin-styled-components"]
    }),
    json({
      exclude: ["node_modules/**"]
    }),
    resolve(),
    builtins(),
    commonjs({
      include: "node_modules/**",
      namedExports: {
        // "node_modules/immutable/dist/immutable.js": [
        //   "Iterable",
        //   "Seq",
        //   "Collection",
        //   "Map",
        //   "OrderedMap",
        //   "List",
        //   "Stack",
        //   "Set",
        //   "OrderedSet",
        //   "Record",
        //   "Range",
        //   "Repeat",
        //   "is",
        //   "fromJS"
        // ],
        "node_modules/esrever/esrever.js": ["reverse"],
        "node_modules/react/index.js": [
          "cloneElement",
          "createContext",
          "Component",
          "createElement",
          "Fragment"
        ],
        "node_modules/react-dom/index.js": ["render", "hydrate"],
        "node_modules/react-is/index.js": [
          "isElement",
          "isValidElementType",
          "ForwardRef"
        ]
      }
    })
  ]
};
