require('dotenv').config({ path: '.env' });

const knexConfig = require('./knexfile');
const knex = require('knex');

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

const SeedingException = function (message) {
  this.message = message;
  this.name = 'SeedingException';
};

const checkSeededTable = function (model) {
  const thisModel = provideModelWithKnex(model);
  return thisModel.query()
    .first()
    .then((res) => {
      if (res === undefined) {
        throw new SeedingException(`${thisModel.tableName} is empty`);
      }
    })
    .then(() => thisModel.knex().destroy());
};

module.exports.provideKnex = provideKnex;
module.exports.provideModelWithKnex = provideModelWithKnex;
module.exports.insertSeed = insertSeed;
module.exports.checkSeededTable = checkSeededTable;
