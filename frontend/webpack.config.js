var path = require("path");

module.exports = {
  module: {
    rules: [
      {
        test: /.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  entry: path.join(__dirname, "src/index.jsx"),
  output: {
    path: path.join(__dirname, "test"),
    filename: "thermostat-control.bundle.js",
  },
  devtool: "eval-source-map",
  devServer: {
    contentBase: path.join(__dirname, "test"),
  },
};
