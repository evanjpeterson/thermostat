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
          modules: ["src", "node_modules"],
        },
        test: /\.(ts|tsx|js|jsx)$/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        use: [{ loader: "style-loader" }, { loader: "css-loader" }],
      },
    ],
  },
};
