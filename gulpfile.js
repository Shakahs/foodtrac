require('dotenv').config();
const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const knexConfig = require('./knexfile');
const knex = require('knex')(knexConfig.development);
const fs = require('fs');
const gutil = require('gulp-util');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');
const WebpackDevServer = require('webpack-dev-server');

gulp.task('db:recreate', (cb) => {
  const sql = fs.readFileSync('./config/database/Foodtrac.sql').toString();
  knex.raw('DROP DATABASE foodtrac')
    .then(() => knex.raw('CREATE DATABASE foodtrac'))
    .then(() => knex.raw(sql))
    .then(() => { cb(); })
    .catch((err) => { cb(err); });
});

gulp.task('nodemon', () => {
  const stream = nodemon({ // eslint-disable-line no-unused-vars
    script: 'server/index.js',
    watch: ['./server/', './server/db'],
  });
});


gulp.task('webpackhot', () => {
  // Start a webpack-dev-server
  webpackConfig.plugins = [new webpack.HotModuleReplacementPlugin()];
  webpackConfig.entry.app = [
    `webpack-dev-server/client?http://localhost:${process.env.WEBPACK_PORT}`,
    'webpack/hot/dev-server',
  ].concat(webpackConfig.entry.app);
  const compiler = webpack(webpackConfig);
  new WebpackDevServer(compiler, webpackConfig.devServer).listen(process.env.WEBPACK_PORT, 'localhost', (err) => {
    if (err) throw new gutil.PluginError('webpack-dev-server', err);
    // Server listening
    gutil.log('[webpack-dev-server]', `Dev server listening on http://localhost:${process.env.WEBPACK_PORT}`);

    // keep the server alive or continue?
    //  callback();
  });
});

gulp.task('default', ['nodemon', 'webpackhot']);
