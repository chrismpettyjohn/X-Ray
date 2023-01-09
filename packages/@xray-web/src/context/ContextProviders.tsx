import React from 'react';
import {ContextProvidersProps} from './ContextProviders.types';
import {SessionContextProvider} from './session/SessionProvider';
import {GraphQLContextProvider} from './graphql/GraphQLContextProvider';

export function ContextProviders({children}: ContextProvidersProps) {
  return (
    <GraphQLContextProvider>
      <SessionContextProvider>{children}</SessionContextProvider>
    </GraphQLContextProvider>
  );
}
