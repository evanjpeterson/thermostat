const path = require("path");

module.exports = {
  entry: {
    "thermostat-control": path.join(__dirname, "src/index.jsx"),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        resolve: {
          extensions: [".js", ".jsx"],
        },
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
};
