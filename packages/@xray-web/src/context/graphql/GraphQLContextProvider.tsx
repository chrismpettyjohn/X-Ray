import {Provider} from 'urql';
import React, {useState} from 'react';
import {graphQLContext} from './GraphQLContext';
import {graphqlClient} from '../../graphql-client';
import {GraphQLContextProviderProps} from './GraphQLContext.types';

export function GraphQLContextProvider({
  children,
}: GraphQLContextProviderProps) {
  return (
    <Provider value={graphqlClient as any}>
      <graphQLContext.Provider value={{graphqlClient}}>
        {children}
      </graphQLContext.Provider>
    </Provider>
  );
}
