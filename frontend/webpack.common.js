const path = require("path");

console.log(path.resolve(__dirname, "src"));
module.exports = {
  entry: {
    "thermostat-control": path.join(__dirname, "src/index.tsx"),
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        resolve: {
          extensions: [".ts", ".tsx", ".js", ".jsx"],
          modules: ["node_modules", "src"],
        },
        test: /\.(ts|tsx|js|jsx)$/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
};
