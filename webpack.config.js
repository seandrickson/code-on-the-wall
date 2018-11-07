/* eslint-env node */

module.exports = {
  entry: "./src/index.mjs",
  output: {
    path: __dirname + "/dist",
    filename: "code-on-the-wall.js"
  },
  module: {
    rules: [
      {
        test: /\.mjs$/,
        include: [__dirname + "/src"],
        use: ["babel-loader", "eslint-loader"]
      }
    ]
  },
  devtool: "source-map",
  mode: "production"
};
