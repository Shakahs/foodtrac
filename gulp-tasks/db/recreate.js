const { provideKnex } = require('../../dbutil');
const fs = require('fs');

module.exports = {
  fn() {
    const thisKnex = provideKnex();
    const sql = fs.readFileSync('./config/database/Foodtrac.sql').toString();
    return thisKnex.raw('DROP DATABASE foodtrac')
      .then(() => thisKnex.raw('CREATE DATABASE foodtrac'))
      .then(() => thisKnex.raw(sql))
      .then(() => thisKnex.destroy());
  },
};

