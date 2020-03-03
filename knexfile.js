module.exports = {
  client: 'postgresql',
  connection: {
    database: 'chatio',
    user:     'postgres',
    password: 'viper32x'
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations'
  }
};