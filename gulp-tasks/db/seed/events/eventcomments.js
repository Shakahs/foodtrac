const jsf = require('json-schema-faker');
const Faker = require('faker');
const Chance = require('chance');
const Users = require('../../../../server/db/users.model');
const Events = require('../../../../server/db/events/events.model');
const EventComments = require('../../../../server/db/events/eventcomments.model');
const { insertSeed, checkSeededTable, provideModelWithKnex } = require('../../../../dbutil');

const chance = new Chance();
jsf.extend('faker', () => Faker);
jsf.extend('chance', () => chance);

module.exports = {
  fn() {
    const boundUsers = provideModelWithKnex(Users);
    const boundEvents = provideModelWithKnex(Events);
    let usersList = [];
    let eventsList = [];
    return boundEvents.query()
      .then((res) => {
        eventsList = res;
        return boundEvents.knex().destroy();
      })
      .then(() => boundUsers.query())
      .then((res) => {
        usersList = res;
        return boundUsers.knex().destroy();
      })
      .then(() => {
        const newSeedData = [];
        eventsList.forEach((event) => {
          for (let i = 0; i < chance.integer({ min: 0, max: 8 }); i++) {
            const newSeedDataItem = {};
            newSeedDataItem.event_id = event.id;
            newSeedDataItem.user_id = chance.pickone(usersList).id;
            newSeedDataItem.text = chance.sentence({ sentences: chance.integer({ min: 1, max: 4 }) });
            newSeedData.push(newSeedDataItem);
          }
        });
        return newSeedData;
      })
      .then(seedData => insertSeed('EventComments', seedData))
      .then(() => checkSeededTable(EventComments));
  },
};
