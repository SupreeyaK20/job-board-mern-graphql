import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { apolloClient } from "./helpers/apolloClientConfig";

// Below config for without Authentication Api's
// const client = new ApolloClient({
//   uri: "http://localhost:5000/graphql",
//   cache: new InMemoryCache(),
// });

const root = createRoot(document.getElementById("root"));
root.render(
  <ApolloProvider client={apolloClient}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>
);
