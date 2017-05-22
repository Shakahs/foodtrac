require('dotenv').config();
const fs = require('fs');
const gulp = require('gulp');
const runSequence = require('run-sequence');
const gutil = require('gulp-util');
const nodemon = require('gulp-nodemon');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');
const WebpackDevServer = require('webpack-dev-server');
const jsf = require('json-schema-faker');
const { Model } = require('objection');
const knexConfig = require('./knexfile');
const knex = require('knex');
const Users = require('./server/db/users.model');


gulp.task('db:recreate', (cb) => {
  const thisKnex = knex(knexConfig.development);
  Model.knex(thisKnex);
  const sql = fs.readFileSync('./config/database/Foodtrac.sql').toString();
  thisKnex.raw('DROP DATABASE foodtrac')
    .then(() => thisKnex.raw('CREATE DATABASE foodtrac'))
    .then(() => thisKnex.raw(sql))
    .then(() => thisKnex.destroy())
    .then(() => { cb(); })
    .catch((err) => { cb(err); });
});

gulp.task('db:seed:users', (cb) => {
  const thisKnex = knex(knexConfig.development);
  Model.knex(thisKnex);
  const userSeedSchema = {
    type: 'array',
    minItems: 50,
    maxItems: 100,
    items: Users.jsonSchema,
  };
  jsf.resolve(userSeedSchema)
    .then(seedData => thisKnex.batchInsert('Users', seedData))
    .then(() => thisKnex.destroy())
    .then(() => { cb(); })
    .catch((err) => { cb(err); });
});

gulp.task('db', (cb) => {
  runSequence('db:recreate', 'db:seed:users', cb);
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
