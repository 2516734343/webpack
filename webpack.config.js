

module.exports = {

  mode: 'development',// production
  devTool: 'source-map',
  entry: "./src/index.js",
  output: {
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /lodash/,
        use: [
          {
            loader: "cache-loader",
            options: {
              cacheDirectory: "./cache"
            }
          },
          "thread-loader",
          "babel-loader"
        ]
      }
    ],
    noParse: /juqery/
  }

}