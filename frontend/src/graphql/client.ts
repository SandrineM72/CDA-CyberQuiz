import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

const uri = typeof window === "undefined"
  ? process.env.GRAPHQL_API_URL_SSR || "http://backend:4001/graphql"
  : process.env.NEXT_PUBLIC_GRAPHQL_API_URL || "http://localhost:4001/graphql";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({ uri, credentials: "include" }), 
});

export default client;
