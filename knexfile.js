module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/byob',
    migrations: {
      directory: '/db/migrations'
    },
    seeds: {
      directory: '/db/seeds/dev'
    },
    useNullAsDefault: true
  },

  test: {
    client: 'pg',
    connection: 'postgres://localhost/byob_test',
    migrations: {
      directory: __dirname + '/db/migrations'
    },
    seeds: {
      directory: __dirname + '/db/seeds/test'
    },
    useNullAsDefault: true
  }
};
