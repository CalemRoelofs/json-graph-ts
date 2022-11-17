const path = require("path");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")

module.exports = {
  entry: "./dist/lib/es5/index.js",
  output: {
    path: path.resolve(__dirname, "dist/lib/es5"),
    filename: "index.bundle.js",
    libraryTarget: 'umd',
    library: '@kaylum.io/json-graph-ts',
    umdNamedDefine: true
  },
  plugins: [
    new NodePolyfillPlugin()
  ]
};