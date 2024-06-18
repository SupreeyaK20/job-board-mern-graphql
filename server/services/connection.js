import knex from 'knex';

export const connection = knex({
  client: 'better-sqlite3',
  connection: {
    filename: './db/db.sqlite3',
  },
  useNullAsDefault: true,
});
