const path = require('path');

module.exports = {
  devtool: 'eval',
  entry: {
    app: [
      'babel-polyfill',
      'react-hot-loader/patch',
      './src/index',
    ],
  },
  output: {
    path: path.resolve(__dirname, './public'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      { test: /\.js[x]?$/,
        exclude: /node_modules/,
        loader: 'babel-loader' },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devServer: {
    contentBase: './static/',
  },
};
