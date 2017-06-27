require('dotenv').config();
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const path = require('path');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');


if (process.env.NODE_ENV === undefined) {
  process.env.NODE_ENV = 'development';
}

const webpackConfig = {
  entry: {
    app: [
      'babel-polyfill',
      'react-hot-loader/patch',
      './src/index',
    ],
  },
  output: {
    path: path.resolve(__dirname, './static'),
    filename: 'bundle.js',
    publicPath: '/',
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
    historyApiFallback: true,
    proxy: [
      {
        context: ['/api'],
        target: `http://localhost:${process.env.PORT}`,
      },
    ],
  },
  devtool: 'eval',
  cache: true,
  externals: {
    globalConfig: `{
     AUTH0_CLIENT_ID: '${process.env.AUTH0_CLIENT_ID}',
     AUTH0_DOMAIN: '${process.env.AUTH0_DOMAIN}',
     AUTH0_DB_NAME: '${process.env.AUTH0_DB_NAME}',
     VAPID_PUB: '${process.env.VAPID_PUB}',
   }`,
  },
  // plugins: [
    // new BundleAnalyzerPlugin(),
    // new ExtractTextPlugin('bundle.css'),
  // ],
};

webpackConfig.module.loaders.push({
  test: /\.(scss|css)$/,
  loaders: ['style-loader', 'css-loader', 'sass-loader'],
});

webpackConfig.module.loaders.push({
  test: /\.(eot|svg|ttf|woff(2)?)(\?v=\d+\.\d+\.\d+)?/,
  loaders: ['url-loader'],
});

module.exports = webpackConfig;
