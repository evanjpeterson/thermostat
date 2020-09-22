const path = require("path");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "development",
  output: {
    path: path.join(__dirname, "test"),
    filename: "[name].bundle.js",
  },
  devtool: "source-map",
  devServer: {
    contentBase: path.join(__dirname, "test"),
  },
});
