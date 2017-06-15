module.exports = {
  development: {
    client: 'mysql',
    connection: {
      user: 'root',
      password: '',
      database: 'foodtrac',
      multipleStatements: true,
      timezone: 'utc',
    },
  },
};
