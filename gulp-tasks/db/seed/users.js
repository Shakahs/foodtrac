const fs = require('fs');
const jsf = require('json-schema-faker');
const Faker = require('faker');
const Chance = require('chance');
const ManagementClient = require('auth0').ManagementClient;
const axios = require('axios');
const Bottleneck = require('bottleneck');
const Promise = require('bluebird');
const Users = require('../../../server/db/users.model');

const { insertSeed } = require('../../../dbutil');
const { checkSeededTable } = require('../../../dbutil');

const chance = new Chance();
jsf.extend('faker', () => Faker);
jsf.extend('chance', () => chance);

module.exports = {
  fn() {
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
  },
};

//
// gulp.task('db:seed:users', () => {
//   let auth0SeedData = null;
//   let originalSeedData = null;
//   const auth0Results = {};
//   const userSeedSchema = {
//     type: 'array',
//     minItems: 50,
//     maxItems: 100,
//     uniqueItems: true,
//     items: Users.jsonSchema,
//   };
//   userSeedSchema.items.required.push('email');
//   return jsf.resolve(userSeedSchema)
//     .then((seedData) => {
//       originalSeedData = seedData;
//       return seedData.map((seedItem) => {
//         const newSeedItem = {};
//         newSeedItem.connection = process.env.AUTH0_DB_NAME;
//         newSeedItem.email = seedItem.email;
//         newSeedItem.password = 'test';
//         newSeedItem.user_metadata = {};
//         newSeedItem.user_metadata.signed_up_as_truck_owner = (seedItem.is_truck_owner) ? '1' : '0';
//         return newSeedItem;
//       });
//     })
//     .then((seedData) => {
//       auth0SeedData = seedData;
//       fs.writeFileSync('./temp.auth0users.txt', JSON.stringify(auth0SeedData, null, 2));
//
//       const url = `https://${process.env.AUTH0_DOMAIN}/oauth/token`;
//       const config = { headers: { 'content-type': 'application/json' } };
//       const body = { grant_type: 'client_credentials',
//         client_id: process.env.AUTH0_SEEDING_CLIENT_ID,
//         client_secret: process.env.AUTH0_SEEDING_CLIENT_SECRET,
//         audience: `https://${process.env.AUTH0_DOMAIN}/api/v2/` };
//       return axios.post(url, body, config);
//     })
//     .then((tokenRes) => {
//       const auth0Management = new ManagementClient({
//         token: tokenRes.data.access_token,
//         domain: process.env.AUTH0_DOMAIN,
//       });
//
//       const doCreate = function (obj) {
//         return auth0Management.createUser(obj)
//           .then((createResult) => {
//             auth0Results[createResult.email] = createResult;
//           });
//       };
//
//       const limiter = new Bottleneck(0, 25);
//
//       const createThrottled = function (obj) {
//         return limiter.schedule(doCreate, obj);
//       };
//
//       return Promise.map(auth0SeedData, createThrottled);
//     })
//     .then(() => originalSeedData.map((seedDataItem) => {
//       const newSeedDataItem = Object.assign({}, seedDataItem);
//       newSeedDataItem.auth0_id = auth0Results[newSeedDataItem.email].user_id;
//       delete newSeedDataItem.email;
//       return newSeedDataItem;
//     }))
//     .then(finalSeedData => insertSeed('Users', finalSeedData))
//     .then(() => checkSeededTable(Users));
// });
