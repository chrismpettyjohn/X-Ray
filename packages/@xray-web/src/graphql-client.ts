import {GRAPHQL_URL} from './environment';
import {createClient, dedupExchange, cacheExchange, fetchExchange} from 'urql';

export type GraphQLClient = any;

export const graphqlClient = createClient({
  url: GRAPHQL_URL,
  exchanges: [
    // deduplicates requests if we send the same queries twice
    dedupExchange,
    // from prior example
    cacheExchange,
    // responsible for sending our requests to our GraphQL API
    fetchExchange,
  ],
});
