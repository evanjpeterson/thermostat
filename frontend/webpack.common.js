const path = require("path");

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
  entry: {
    "thermostat-control": path.join(__dirname, "src/index.jsx"),
  },
};
