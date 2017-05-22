require('dotenv').config();
const fs = require('fs');
const os = require('os');
const path = require('path');
const gulp = require('gulp');
const runSequence = require('run-sequence');
const gutil = require('gulp-util');
const nodemon = require('gulp-nodemon');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');
const WebpackDevServer = require('webpack-dev-server');
const jsf = require('json-schema-faker');
const axios = require('axios');
const Promise = require('bluebird');
const { Model } = require('objection');
const knexConfig = require('./knexfile');
const knex = require('knex');
const Users = require('./server/db/users.model');
const Chance = require('chance');

/*
 /
 /
 / Database tasks
 /
 /
*/

jsf.extend('chance', () => {
  const chance = new Chance();

  chance.mixin({
    weightedTruckOwner() {
      return chance.weighted([true, false], [1, 100]);
    },
  });

  return chance;
});

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
    minItems: 5000,
    maxItems: 10000,
    uniqueItems: true,
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

/*
 /
 /
 / Downloading DB/API schemas
 /
 /
*/

gulp.task('schema:db:download', (cb) => {
  const axiosConf = { auth: { username: process.env.VERTABELO_KEY } };

  axios.all([
    axios.get(`https://my.vertabelo.com/api/sql/${process.env.VERTABELO_MODEL}`, axiosConf),
    axios.get(`https://my.vertabelo.com/api/xml/${process.env.VERTABELO_MODEL}`, axiosConf),
  ])
    .then(axios.spread((sql, xml) => {
      fs.writeFileSync('config/database/Foodtrac.sql', sql.data);
      fs.writeFileSync('config/database/Foodtrac.xml', xml.data);
    }))
    .then(() => { cb(); })
    .catch((err) => { cb(err); });
});

gulp.task('schema:db', (cb) => {
  runSequence('schema:db:download', 'db', cb);
});

gulp.task('schema:api', (cb) => {
  const pRename = Promise.promisify(fs.rename);
  const apiFileSource = path.join(os.homedir(), 'Downloads', 'swagger20.json');
  const apiFileTarget = path.join('server', 'api.json');
  pRename(apiFileSource, apiFileTarget)
    .then(() => {
      console.log(`API file copied from Downloads directory to ${apiFileTarget}`); // eslint-disable-line no-console
      cb();
    })
    .catch((err) => { cb(err); });
});

/*
/
/
/ Starting dev environment
/
/
*/

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
