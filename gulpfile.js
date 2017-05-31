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
const knexConfig = require('./knexfile');
const knex = require('knex');
const Chance = require('chance');
const Faker = require('faker');
const moment = require('moment');
const ManagementClient = require('auth0').ManagementClient;
const Bottleneck = require('bottleneck');
const Users = require('./server/db/users.model');
const FoodGenres = require('./server/db/foodgenres.model');
const Brands = require('./server/db/brands.model');
const Trucks = require('./server/db/trucks.model');
const Locations = require('./server/db/locations.model');
const LocationTimelines = require('./server/db/locationtimelines.model');
const MenuItems = require('./server/db/menuitems.model');
const BrandComments = require('./server/db/brandcomments.model');

const chance = new Chance();

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

const provideKnex = () => knex(knexConfig.development);

const provideModelWithKnex = (model) => {
  const thisKnex = provideKnex();
  return model.bindKnex(thisKnex);
};

const insertSeed = (table, seedData) => {
  const thisKnex = provideKnex();
  return thisKnex.batchInsert(table, seedData)
    .then(() => thisKnex.destroy());
};

function SeedingException(message) {
  this.message = message;
  this.name = 'SeedingException';
}

function checkSeededTable(model) {
  const thisModel = provideModelWithKnex(model);
  return thisModel.query()
    .first()
    .then((res) => {
      if (res === undefined) {
        throw new SeedingException(`${thisModel.tableName} is empty`);
      }
    })
    .then(() => thisModel.knex().destroy());
}

gulp.task('db', (cb) => {
  runSequence('db:recreate', ['db:seed:users', 'db:seed:foodgenres', 'db:seed:locations'], 'db:seed:brands',
    'db:seed:trucks', 'db:seed:locationtimelines', 'db:seed:menuitems', 'db:seed:brandcomments', cb);
});

gulp.task('db:recreate', () => {
  const thisKnex = provideKnex();
  const sql = fs.readFileSync('./config/database/Foodtrac.sql').toString();
  return thisKnex.raw('DROP DATABASE foodtrac')
    .then(() => thisKnex.raw('CREATE DATABASE foodtrac'))
    .then(() => thisKnex.raw(sql))
    .then(() => thisKnex.destroy());
});

gulp.task('db:seed:users', () => {
  let auth0SeedData = null;
  let originalSeedData = null;
  const auth0Results = {};
  const userSeedSchema = {
    type: 'array',
    minItems: 50,
    maxItems: 100,
    uniqueItems: true,
    items: Users.jsonSchema,
  };
  userSeedSchema.items.required.push('email');
  return jsf.resolve(userSeedSchema)
    .then((seedData) => {
      originalSeedData = seedData;
      return seedData.map((seedItem) => {
        const newSeedItem = {};
        newSeedItem.connection = process.env.AUTH0_DB_NAME;
        newSeedItem.email = seedItem.email;
        newSeedItem.password = 'test';
        newSeedItem.user_metadata = {};
        newSeedItem.user_metadata.signed_up_as_truck_owner = (seedItem.is_truck_owner) ? '1' : '0';
        return newSeedItem;
      });
    })
    .then((seedData) => {
      auth0SeedData = seedData;
      fs.writeFileSync('./temp.auth0users.txt', JSON.stringify(auth0SeedData, null, 2));

      const url = `https://${process.env.AUTH0_DOMAIN}/oauth/token`;
      const config = { headers: { 'content-type': 'application/json' } };
      const body = { grant_type: 'client_credentials',
        client_id: process.env.AUTH0_SEEDING_CLIENT_ID,
        client_secret: process.env.AUTH0_SEEDING_CLIENT_SECRET,
        audience: `https://${process.env.AUTH0_DOMAIN}/api/v2/` };
      return axios.post(url, body, config);
    })
    .then((tokenRes) => {
      const auth0Management = new ManagementClient({
        token: tokenRes.data.access_token,
        domain: process.env.AUTH0_DOMAIN,
      });

      const doCreate = function (obj) {
        return auth0Management.createUser(obj)
          .then((createResult) => {
            auth0Results[createResult.email] = createResult;
          });
      };

      const limiter = new Bottleneck(0, 25);

      const createThrottled = function (obj) {
        return limiter.schedule(doCreate, obj);
      };

      return Promise.map(auth0SeedData, createThrottled);
    })
    .then(() => originalSeedData.map((seedDataItem) => {
      const newSeedDataItem = Object.assign({}, seedDataItem);
      newSeedDataItem.auth0_id = auth0Results[newSeedDataItem.email].user_id;
      delete newSeedDataItem.email;
      return newSeedDataItem;
    }))
      .then(finalSeedData => insertSeed('Users', finalSeedData))
      .then(() => checkSeededTable(Users));
});

gulp.task('db:seed:foodgenres', () => {
  const foodGenreSchema = {
    type: 'array',
    minItems: 6,
    maxItems: 6,
    uniqueItems: true,
    items: FoodGenres.jsonSchema,
  };
  return jsf.resolve(foodGenreSchema)
    .then(seedData => insertSeed('FoodGenres', seedData))
    .then(() => checkSeededTable(FoodGenres));
});

gulp.task('db:seed:brands', () => {
  const brandSchema = {
    type: 'array',
    uniqueItems: true,
    items: Brands.jsonSchema,
  };
  const boundUsers = provideModelWithKnex(Users);
  const boundFoodGenres = provideModelWithKnex(FoodGenres);
  let userList = [];
  let foodGenres = [];
  return boundUsers.query()
    .where('is_truck_owner', true)
    .then((res) => {
      userList = res;
      return boundUsers.knex().destroy();
    })
    .then(() => boundFoodGenres.query())
    .then((res) => {
      foodGenres = res;
      return boundFoodGenres.knex().destroy();
    })
    .then(() => {
      brandSchema.minItems = userList.length;
      brandSchema.maxItems = userList.length;
      return jsf.resolve(brandSchema);
    })
    .then((seedData) => {
      const newSeedData = seedData.map((seedDataItem) => {
        const newSeedDataItem = Object.assign({}, seedDataItem);
        newSeedDataItem.owner_id = userList.pop().id;
        newSeedDataItem.food_genre_id = chance.pickone(foodGenres).id;
        delete newSeedDataItem.default_coupon_id;
        newSeedDataItem.name += ' Truck';
        return newSeedDataItem;
      });
      return newSeedData;
    })
    .then(seedData => insertSeed('Brands', seedData))
    .then(() => checkSeededTable(Brands));
});

gulp.task('db:seed:trucks', () => {
  const truckSchema = {
    type: 'array',
    uniqueItems: true,
    items: Trucks.jsonSchema,
  };
  const boundBrands = provideModelWithKnex(Brands);
  let brandList = [];
  return boundBrands.query()
    .then((res) => {
      brandList = res;
      return boundBrands.knex().destroy();
    })
    .then(() => {
      truckSchema.minItems = brandList.length;
      truckSchema.maxItems = brandList.length;
      return jsf.resolve(truckSchema);
    })
    .then(seedData => seedData.map((seedDataItem) => {
      const newSeedDataItem = Object.assign({}, seedDataItem);
      newSeedDataItem.brand_id = brandList.pop().id;
      return newSeedDataItem;
    }))
    .then(seedData => insertSeed('Trucks', seedData))
    .then(() => checkSeededTable(Trucks));
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
        const lastSetStart = moment();
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
