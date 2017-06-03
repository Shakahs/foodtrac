module.exports = {
  development: {
    client: 'mysql',
    connection: {
      host: process.env.DATABASE_HOST,
      user: 'foodtrac',
      password: 'foodtracdata',
      database: 'foodtrac',
      multipleStatements: true,
      timezone: 'utc',
    },
  },
};
