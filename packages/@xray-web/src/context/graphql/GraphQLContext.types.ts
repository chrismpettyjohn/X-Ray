import {Client} from 'urql';
import {ReactNode} from 'react';

export interface GraphQLContext {
  graphqlClient: Client;
}

export const defaultGraphQLContext: GraphQLContext = {
  graphqlClient: undefined as any,
};

export interface GraphQLContextProviderProps {
  children: ReactNode;
}
