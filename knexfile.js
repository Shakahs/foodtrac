module.exports = {
  development: {
    client: 'mysql',
    connection: {
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PW,
      database: process.env.DATABASE_NAME,
      multipleStatements: true,
      timezone: 'utc',
    },
  },
};
