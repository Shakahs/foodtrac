require('dotenv').config();
const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const knexConfig = require('./knexfile');
const knex = require('knex')(knexConfig.development);
const fs = require('fs');


gulp.task('db:recreate', (cb) => {
  const sql = fs.readFileSync('./dev/database/Foodtrac.sql').toString();
  knex.raw('DROP DATABASE foodtrac')
    .then(() => knex.raw('CREATE DATABASE foodtrac'))
    .then(() => knex.raw(sql))
    .then(() => { cb(); })
    .catch((err) => { cb(err); });
});

gulp.task('nodemon', () => {
  const stream = nodemon({ // eslint-disable-line no-unused-vars
    script: 'server/index.js',
    watch: ['server/**'],
  });
});

gulp.task('default', ['nodemon']);
