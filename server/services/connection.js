import knex from 'knex';

export const connection = knex({
  client: 'better-sqlite3',
  connection: {
    filename: './db/db.sqlite3',
  },
  useNullAsDefault: true,
});


// import knex from 'knex';
// import path from 'path';
// import { fileURLToPath } from 'url';

// // Convert import.meta.url to a file path
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const dbPath = path.resolve(__dirname, '../db/db.sqlite3');
// console.log('Resolved DB Path:', dbPath);

// export const connection = knex({
//   client: 'better-sqlite3',
//   connection: {
//     filename: dbPath,
//   },
//   useNullAsDefault: true,
// });
