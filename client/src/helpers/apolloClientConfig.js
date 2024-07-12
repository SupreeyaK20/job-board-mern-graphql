import { ApolloClient, ApolloLink, InMemoryCache, concat, createHttpLink } from "@apollo/client";
import { getAccessToken } from "../graphql/auth/auth";

const httpLink = createHttpLink({ uri: 'http://localhost:5000/graphql' });

const authLink = new ApolloLink((operation, forward) => {
  const accessToken = getAccessToken();
  if (accessToken) {
    operation.setContext({
      headers: { 'Authorization': `Bearer ${accessToken}` },
    });
  }
  return forward(operation);
});

export const apolloClient = new ApolloClient({
  link: concat(authLink, httpLink),
  cache: new InMemoryCache(),
});