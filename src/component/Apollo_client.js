import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";

const client = new ApolloClient({
  uri: 'https://kampusmerdeka.hasura.app/v1/graphql',
  cache: new InMemoryCache(),
  headers: {
      'x-hasura-admin-secret' : 'GJyFmwaJfr1RRinrd2T40xq6njF28njBZ4wb5mrJ5xTVo05p4uHy3iRRK6CpJwOk'
  }
});

export default client