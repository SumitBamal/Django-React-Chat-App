module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  externals: {
    'Config': JSON.stringify(process.env.NODE_ENV === 'production' ? {
      serverUrl: "https://myserver.com"
    } : {
        serverUrl: "http://localhost:8000"
      })
  }
};