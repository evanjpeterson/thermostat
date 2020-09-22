const path = require("path");

console.log(path.resolve(__dirname, "src"));
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
          modules: ["node_modules", "src"],
        },
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
};
