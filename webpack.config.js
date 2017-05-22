require('dotenv').config();
const path = require('path');

const webpackConfig = {
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
    loaders: [
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
    hot: true,
    inline: true,
    stats: true,
    clientLogLevel: 'info',
    proxy: [
      {
        context: ['/api'],
        target: `http://localhost:${process.env.PORT}`,
      },
    ],
  },
  devtool: 'eval',
  cache: true,
};

webpackConfig.module.loaders.push({
  test: /\.(scss|css)$/,
  loaders: ['style-loader', 'css-loader', 'sass-loader'],
});

module.exports = webpackConfig;
