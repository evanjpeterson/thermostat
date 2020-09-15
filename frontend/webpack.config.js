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
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  output: {
    path: path.join(__dirname, "test"),
    filename: "thermostat-control.bundle.js",
  },
  devServer: {
    contentBase: path.join(__dirname, "test"),
  },
};
