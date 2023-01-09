import {WebSocketLink} from 'apollo-link-ws';
import {GRAPHQL_URL} from './environment';
import {ApolloClient, InMemoryCache} from '@apollo/client';

export type GraphQLClient = ApolloClient<any>;

export const generateGraphQLClient = (): GraphQLClient => {
  return new ApolloClient({
    // @ts-ignore
    link: new WebSocketLink({
      uri: GRAPHQL_URL,
      options: {
        reconnect: true,
      },
    }),
    cache: new InMemoryCache(),
  });
};

export const graphqlClient = new ApolloClient({
  // @ts-ignore
  link: new WebSocketLink({
    uri: GRAPHQL_URL,
    options: {
      reconnect: true,
    },
  }),
  cache: new InMemoryCache(),
});
