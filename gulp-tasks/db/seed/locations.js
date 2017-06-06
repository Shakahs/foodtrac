const jsf = require('json-schema-faker');
const Faker = require('faker');
const Chance = require('chance');
const Promise = require('bluebird');
const Locations = require('../../../server/db/locations.model');
const { insertSeed } = require('../../../dbutil');
const { checkSeededTable } = require('../../../dbutil');

const chance = new Chance();
jsf.extend('faker', () => Faker);
jsf.extend('chance', () => chance);

const googleMapsClient = require('@google/maps').createClient({
  key: process.env.GOOGLE_API_KEY,
  Promise,
});

module.exports = {
  fn() {
    const query = {
      location: '34.053736,-118.242809', // LA city hall
      radius: 25000,
      type: 'store',
    };
    return googleMapsClient.placesRadar(query).asPromise()
      .then((radarData) => {
        const dataSlice = radarData.json.results.slice(0, 100);
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
  },
};
