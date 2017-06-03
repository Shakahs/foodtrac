const jsf = require('json-schema-faker');
const Faker = require('faker');
const Chance = require('chance');
const Users = require('../../../../server/db/users.model');
const Events = require('../../../../server/db/events/events.model');
const { insertSeed, checkSeededTable, provideModelWithKnex } = require('../../../../dbutil');

const chance = new Chance();
jsf.extend('faker', () => Faker);
jsf.extend('chance', () => chance);

module.exports = {
  fn() {
    let userList = [];
    let eventList = [];
    const boundUsers = provideModelWithKnex(Users);
    const boundEvents = provideModelWithKnex(Events);
    return boundUsers.query()
      .then((res) => {
        userList = res;
        return boundUsers.knex().destroy();
      })
      .then(() => boundEvents.query())
      .then((res) => {
        eventList = res;
        return boundEvents.knex().destroy();
      })
      .then(() => {
        const seedAttendees = [];
        userList.forEach((user) => {
          if (chance.bool()) {
            const attendee = {
              event_id: chance.pickone(eventList).id,
              user_id: user.id,
            };
            seedAttendees.push(attendee);
          }
        });
        return seedAttendees;
      })
      .then(seedData => insertSeed('UserAttendees', seedData))
      .then(() => checkSeededTable(Users));
  },
};
