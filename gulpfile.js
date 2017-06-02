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
const Promise = require('bluebird');
const Chance = require('chance');
const Faker = require('faker');
const gulpRequireTasks = require('gulp-require-tasks');

const chance = new Chance();
gulpRequireTasks();

/*
 /
 /
 / Database schema application and seeding
 /
 /
*/

jsf.extend('chance', () => chance);
jsf.extend('faker', () => Faker);


gulp.task('db', (cb) => {
  runSequence('db:recreate', ['db:seed:users', 'db:seed:foodgenres', 'db:seed:locations'], 'db:seed:brands',
    'db:seed:trucks', 'db:seed:locationtimelines', 'db:seed:menuitems', 'db:seed:brandcomments', 'db:seed:upvotes', cb);
});

/*
 /
 /
 / Downloading DB/API schemas
 /
 /
*/

gulp.task('schema:api', () => {
  const pRename = Promise.promisify(fs.rename);
  const apiFileSource = path.join(os.homedir(), 'Downloads', 'swagger20.json');
  const apiFileTarget = path.join('server', 'api.json');
  return pRename(apiFileSource, apiFileTarget)
    .then(() => {
      console.log(`API file copied from Downloads directory to ${apiFileTarget}`); // eslint-disable-line no-console
    });
});

/*
/
/
/ Starting dev environment
/
/
*/

gulp.task('default', ['nodemon', 'webpackhot']);

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
