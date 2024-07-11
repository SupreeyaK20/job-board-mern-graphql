import express from 'express'
import cors from 'cors'
import { ApolloServer } from '@apollo/server'
import { expressMiddleware as apolloMiddleware } from '@apollo/server/express4'
import { authMiddleware, handleLogin } from './auth.js';
import { readFile } from 'node:fs/promises'
import { resolvers } from './resolver.js'
import { createUserLoader } from './services/users.js';
import { createCompanyLoader } from './services/companies.js';

const PORT = 5000;

const app = express()
app.use(cors(), express.json(), authMiddleware)

app.post('/login', handleLogin)

const typeDefs = await readFile('./schema.graphql', 'utf8')

async function getContext({ req }) {
  const companyLoader = createCompanyLoader()
  const context = { companyLoader }
    if (req.auth) {
      context.user = await createUserLoader(req.auth.id);
    }
    return context;
  }

const apolloServer = new ApolloServer({typeDefs, resolvers})
await apolloServer.start();
app.use('/graphql', apolloMiddleware(apolloServer, { context: getContext }));

app.listen({ port: PORT }, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`GraphQL endpoint: http://localhost:${PORT}/graphql`);
});