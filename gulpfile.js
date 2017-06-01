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
const moment = require('moment');
const Users = require('./server/db/users.model');
const Brands = require('./server/db/brands.model');
const Trucks = require('./server/db/trucks.model');
const Locations = require('./server/db/locations.model');
const LocationTimelines = require('./server/db/locationtimelines.model');
const MenuItems = require('./server/db/menuitems.model');
const BrandComments = require('./server/db/brandcomments.model');
const gulpRequireTasks = require('gulp-require-tasks');

const { provideModelWithKnex } = require('./dbutil');
const { insertSeed } = require('./dbutil');
const { checkSeededTable } = require('./dbutil');

const chance = new Chance();
gulpRequireTasks();

/*
 /
 /
 / Database schema application and seeding
 /
 /
*/

const googleMapsClient = require('@google/maps').createClient({
  key: process.env.GOOGLE_API_KEY,
  Promise,
});

jsf.extend('chance', () => chance);
jsf.extend('faker', () => Faker);


gulp.task('db', (cb) => {
  runSequence('db:recreate', ['db:seed:users', 'db:seed:foodgenres', 'db:seed:locations'], 'db:seed:brands',
    'db:seed:trucks', 'db:seed:locationtimelines', 'db:seed:menuitems', 'db:seed:brandcomments', cb);
});

gulp.task('db:seed:locations', () => {
  const query = {
    location: '34.053736,-118.242809', // LA city hall
    radius: 25000,
    type: 'parking',
  };
  return googleMapsClient.placesRadar(query).asPromise()
    .then((radarData) => {
      const dataSlice = radarData.json.results.slice(0, 40);
      return Promise.map(dataSlice, radarPlace =>
        googleMapsClient.place({ placeid: radarPlace.place_id }).asPromise());
    })
    .then(placeData => placeData.map(place => ({
      name: place.json.result.name,
      address: place.json.result.formatted_address,
      lat: place.json.result.geometry.location.lat,
      lng: place.json.result.geometry.location.lng,
    })))
    .then(seedData => insertSeed('Locations', seedData))
    .then(() => checkSeededTable(Locations));
});

gulp.task('db:seed:locationtimelines', () => {
  const boundTruck = provideModelWithKnex(Trucks);
  const boundLocations = provideModelWithKnex(Locations);
  let truckList = [];
  let locationList = [];
  return boundTruck.query()
    .then((res) => {
      truckList = res;
      return boundTruck.knex().destroy();
    })
    .then(() => boundLocations.query())
    .then((res) => {
      locationList = res;
      return boundLocations.knex().destroy();
    })
    .then(() => {
      const accumulatedSeedData = [];
      truckList.forEach((truck) => {
        const lastSetStart = moment.utc();
        for (let i = 0; i < 5; i++) {
          const newSeedDataItem = {};
          lastSetStart.subtract(chance.integer({ min: 4, max: 7 }), 'hours')
            .subtract(chance.integer({ min: 0, max: 59 }), 'minutes');
          newSeedDataItem.start = moment(lastSetStart);
          newSeedDataItem.end = (chance.bool()) ? moment(newSeedDataItem.start).add(chance.integer({ min: 1, max: 3 }), 'hours')
            .add(chance.integer({ min: 0, max: 59 }), 'minutes').format('YYYY-MM-DD HH:mm:ss') : 0;
          newSeedDataItem.start = newSeedDataItem.start.format('YYYY-MM-DD HH:mm:ss');
          newSeedDataItem.location_id = chance.pickone(locationList).id;
          newSeedDataItem.truck_id = truck.id;
          newSeedDataItem.checked_in = true;
          accumulatedSeedData.push(newSeedDataItem);
        }
      });
      return accumulatedSeedData;
    })
    .then(seedData => insertSeed('LocationTimelines', seedData))
    .then(() => checkSeededTable(LocationTimelines));
});

gulp.task('db:seed:menuitems', () => {
  const menuItemsSchema = {
    type: 'array',
    uniqueItems: true,
    items: MenuItems.jsonSchema,
  };
  const boundBrands = provideModelWithKnex(Brands);
  let brandList = [];
  return boundBrands.query()
    .then((res) => {
      brandList = res;
      return boundBrands.knex().destroy();
    })
    .then(() => {
      menuItemsSchema.minItems = brandList.length;
      menuItemsSchema.maxItems = brandList.length;
      return jsf.resolve(menuItemsSchema);
    })
    .then(seedData => seedData.map((seedDataItem) => {
      const newSeedDataItem = Object.assign({}, seedDataItem);
      newSeedDataItem.brand_id = brandList.pop().id;
      return newSeedDataItem;
    }))
    .then(seedData => insertSeed('MenuItems', seedData))
    .then(() => checkSeededTable(MenuItems));
});

gulp.task('db:seed:brandcomments', () => {
  const brandCommentsSchema = {
    type: 'array',
    uniqueItems: true,
    items: BrandComments.jsonSchema,
  };
  const boundUsers = provideModelWithKnex(Users);
  const boundBrands = provideModelWithKnex(Brands);
  let usersList = [];
  let brandsList = [];
  return boundBrands.query()
    .then((res) => {
      brandsList = res;
      return boundBrands.knex().destroy();
    })
    .then(() => boundUsers.query())
    .then((res) => {
      usersList = res;
      return boundUsers.knex().destroy();
    })
    .then(() => {
      brandCommentsSchema.minItems = brandsList.length;
      brandCommentsSchema.maxItems = brandsList.length;
      return jsf.resolve(brandCommentsSchema);
    })
    .then(seedData => seedData.map((seedDataItem) => {
      const newSeedDataItem = Object.assign({}, seedDataItem);
      newSeedDataItem.brand_id = brandsList.pop().id;
      newSeedDataItem.user_id = usersList.pop().id;
      return newSeedDataItem;
    }))
    .then(seedData => insertSeed('BrandComments', seedData))
    .then(() => checkSeededTable(BrandComments));
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
