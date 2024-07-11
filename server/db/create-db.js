// Run create-db.js file to change in database
import { connection } from '../services/connection.js';

const { schema } = connection;

await schema.dropTableIfExists('user');
await schema.dropTableIfExists('job');
await schema.dropTableIfExists('company');

await schema.createTable('company', (table) => {
  table.text('id').notNullable().primary();
  table.text('name').notNullable();
  table.text('description');
});

await schema.createTable('job', (table) => {
  table.text('id').notNullable().primary();
  table.text('companyId').notNullable()
    .references('id').inTable('company');
  table.text('title').notNullable();
  table.text('description');
  table.text('createdAt').notNullable();
});

await schema.createTable('user', (table) => {
  table.text('id').notNullable().primary();
  table.text('companyId').notNullable()
    .references('id').inTable('company');
  table.text('email').notNullable().unique();
  table.text('password').notNullable();
});

await connection.table('company').insert([
  {
    id: 'comp-01',
    name: 'Facegle',
    description: 'We are a startup on a mission of disrupt AI world',
  },
  {
    id: 'comp-02',
    name: 'Goobook',
    description: 'Gopedia - we store the data',
  },
  {
    id: 'comp-03',
    name: 'Zexo',
    description: 'New product base startup',
  },
]);

await connection.table('job').insert([
  {
    id: 'f3YzmnBZpK0o',
    companyId: 'comp-01',
    title: 'Frontend Developer',
    description: 'We are looking for a Frontend Developer familiar with React.',
    createdAt: '2023-01-26T11:00:00.000Z',
  },
  {
    id: 'XYZNJMXFax6n',
    companyId: 'comp-01',
    title: 'Backend Developer',
    description: 'We are looking for a Backend Developer familiar with Node.js and Express.',
    createdAt: '2023-01-27T11:00:00.000Z',
  },
  {
    id: '6mA05AZxvS1R',
    companyId: 'comp-02',
    title: 'Full-Stack Developer',
    description: 'We are looking for a Full-Stack Developer familiar with Node.js, Express, and React.',
    createdAt: '2023-01-30T11:00:00.000Z',
  },
  {
    id: '6mA05AZxvS1I',
    companyId: 'comp-03',
    title: 'Analyst',
    description: 'We are looking for a Business Analyst.',
    createdAt: '2023-01-30T11:00:00.000Z',
  },
]);

await connection.table('user').insert([
  {
    id: '1',
    companyId: 'comp-01',
    email: 'user1@comapny.com',
    password: '12345678',
  },
  {
    id: '2',
    companyId: 'comp-02',
    email: 'user2@comapny.com',
    password: '12345678',
  },
  {
    id: '3',
    companyId: 'comp-03',
    email: 'user3@comapny.com',
    password: '12345678',
  },
]);

process.exit();
